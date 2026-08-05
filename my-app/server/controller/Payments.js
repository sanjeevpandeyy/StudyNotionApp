const { instance } = require("../config/razorpay");
const Course = require("../model/Course");
const User = require("../model/User");
const mailSender = require("../utils/MailSender");
const courseEnrollmentEmail = require("../mail/tamplates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");
const {paymentSuccessEmail} = require("../mail/tamplates/paymentSuccessEmail");
const CoursesProgress = require("../model/CoursesProgress");

require("dotenv").config();

// Initiate Razorpay Order
exports.capturePayment = async (req, res) => {

  const { courses } = req.body;
  const userId = req.user.id;

if (Array.isArray(courses)) {
  courses.forEach((id, index) => {
    console.log(`Course ${index}:`, id);
  });
}





  if (!courses || courses.length === 0) {
    return res.json({
      success: false,
      message: "Please provide Course Id",
    });
  }

  let totalAmount = 0;

  for (const course_id of courses) {
  

    let course;



    try {
      course = await Course.findById(course_id);

      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Could not find the Course",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: `Student is already Enrolled in ${course.courseName}`,
        });
      }

      totalAmount += course.price;
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        success: false,
        message: e.message,
      });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random().toString(),
  };
  


  try {
    const paymentResponse = await instance.orders.create(options);

    return res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// Payment Verification
exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const courses = req.body.courses;
    const userId = req.user.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Payment Failed",
      });
    }

    console.log("Request Body:", req.body);

console.log("Order ID:", razorpay_order_id);
console.log("Payment ID:", razorpay_payment_id);
console.log("Received Signature:", razorpay_signature);

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

      console.log("Expected Signature:", expectedSignature);
      console.log("Received Signature:", razorpay_signature);

    if (expectedSignature === razorpay_signature) {
      await enrollStudent(courses, userId, res);

      return res.status(200).json({
        success: true,
        message: "Payment Verified",
      });
    }

    return res.status(200).json({
      success: false,
      message: "Payment Failed",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const enrollStudent = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide Course Ids and User Id",
    });
  }

  for (const courseId of courses) {
    // Find course and enroll student
    const enrolledCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          studentEnrolled: userId,
        },
      },
      { new: true }
    );

    if (!enrolledCourse) {
      return res.status(500).json({
        success: false,
        message: "Course Not Found",
      });
    }

    // Add course to user's enrolled courses
    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: courseId,
        },
      },
      { new: true }
    );

    // Send email
    const emailResponse = await mailSender(
      enrolledStudent.email,
      `Successfully Enrolled into ${enrolledCourse.courseName}`,
      courseEnrollmentEmail(
        enrolledCourse.courseName,
        enrolledStudent.firstName
      )
    );

    console.log("Email Sent Successfully", emailResponse.response);

    const courseProgress=await CoursesProgress.create({
      courseID: courseId, 
      userId: userId, 
      completedVideos: [],
    })


  }
};



exports.sendPaymentSuccessEmail=async(req,res)=>{

  try{
    const {orderId,paymentId,amount} =req.body;

    const userId=req.user.id;
  
    if(!orderId ||!paymentId||!amount||!userId){
      return res.status(400).json({
        success: false,
        message: "plsese provide all the fields",
      });
    }
  
    const enrolledStudent=await User.findById(userId);
    await mailSender(enrolledStudent.email,`payment received`,paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId,paymentId));
  }catch(e){
    console.log("error in sending confirm payment mail")
    return res.status(500).json({
      success:false,
      message:"Could not send email"
    })
  }

}




// exports.capturePayment=async(req,res)=>{
//   //get course id and user id

//   const id=req.user.id;
//   const{courseId}=req.body;

//   //validation
//   if(!courseId){
//     return res.status(403).json({
//       success:false,
//       message:"course id not found please pass course id"
//     })
//   }

//   //valid course details
//   let course ;
//   try{
//     course=await Course.findById(courseId);
//     if(!course){
//       return res.status(403).json({
//         success:false,
//         message:"not found the course please enter valid course id"
//       })
//     }

//     //user already by payed

//     const uid=new mongoose.Type.ObjectId(id);
//     if(course.studentEnrolled.includes(uid)){
//       return res.status(200).json({
//           success:false,
//         message:"Student is alreasy enrolled"
//       })
//     }
//   }catch(e){
//     console.log(e);
//     return res.status(500).json({
//       success:false,
//     message:e.message,
//   })
//   }
  
  
// //create order
//   // create object 
//   const amount=course.price;
//   const currency="INR";
//   const options={
//     amount:amount*100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes:{
//       courseId:courseId,
//       userId:id,
//     }
//   }


//   //create call for order
//   try{
//     //initiate the paymetnt using razorpay 
//     const paymentResponse=await instance.orders.create(options);
//     console.log("paymentResponse",paymentResponse);

//     return res.status(200).json({
//       success:true,
//       courseName:course.courseName,
//       courseDecription:course.courseDescription,
//       thumbnail:course.thumbnail,
//       orderId:paymentResponse.id,
//       currency:paymentResponse.currency,
//       message:e.message,
//       amount:paymentResponse.amount,
//     })
//   }catch(e){
//     console.log(e);
//     return res.json({
//       success:false,
//     message:"could not initiate the order",
//   })
//   }
// }




// //verifying signature 

// exports.verifySignature=async(req,res)=>{

//   //server pr pada hua hai
//   const webhookSecret="12345678";
//   const signature =req.header["x-razorpay-signature"];

//   const shasum=  crypto.createHmac("sha256",webhookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest=shasum.digest("hux");

//   if(signature===digest){
//     console.log("payment is authorized");
    
//     const {courseId,userId}=req.body.payload.payment.entity.notes;
    
//     try{

//     //enroll student in course 
//     const enrolledCourse=await Course.findByIdAndUpdate(courseId,{
//       $push:{
//         studentEnrolled:userId,
//       }
//     },{new:true})


//     if(!enrolledCourse){
//       return res.status(500).json({
//         success:false,
//         message:"course not found ",
//       })
//     }


//     // add course in user course
//   const enrolledStudent = await User.findByIdAndUpdate(userId,{
//       $push:{
//       courses:courseId,
//       }
//     },{new:true})
    
//     if(!enrolledStudent){
//       return res.status(500).json({
//         success:false,
//         message:"course not found ",
//       })
//     }

//     //send mail of confirmation
//     const eamilReasponse=await mailSender(enrolledStudent.email,"subject","body code");   //abhi html code send krna baki hai 


//     console.log(eamilReasponse);
//     return res.status(200).json({
//       success:true,
//       message:"student enrolled successfully",
//     })

//     }catch(e){
//       return res.status(500).json({
//         success:false,
//         message:"something went wrong during verifing signature",
//       })
//     }

//   }else{
//     return res.status(500).json({
//       success:false,
//       message:"signature not matched ",
//     })
//   }
// }
