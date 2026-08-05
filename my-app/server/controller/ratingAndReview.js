const { default: mongoose } = require("mongoose");
const Course=require("../model/Course");
const RatingAndReviews = require("../model/RatingAndReviews");

//create rating 

exports.createRating=async(req,res)=>{
  try{
    // get userId
    userId=req.user.id;
    
    //get data
    const{courseId,rating,review}=req.body;

    if(!courseId){
      return res.status(403).json({
        success:false,
        message:"course id not found",
      })
    }
    //check user enrolled

    const CourseDetails=await Course.findById(courseId);

   if(!CourseDetails.studentEnrolled.includes(userId)){
    return res.status(404).json({
      success:false,
      message:"User not enrolled in course please enroll first",
    })
   }

//if(revire already exist so update ) else create new review

const  data={};
if(rating){
  data.rating=rating;
}
if(review){
  data.review=review;
};


const alreadyReviewed=await RatingAndReviews.findOne({user:userId,course:courseId});

if(!alreadyReviewed){
  data.course=courseId;
  data.user=userId;
  const cratedRating=await RatingAndReviews.create(data);
  //add in course 
  await Course.findByIdAndUpdate(courseId,{
    $push:{
      ratingAndReviews:cratedRating._id,
    }
  },{new:true});

  return res.status(200).json({
    success:true,
    message:"rating and review created successfully", 
  })
}else{
  //update review
  const updatedRating=await RatingAndReviews.findByIdAndUpdate(alreadyReviewed._id,data);
  return res.status(200).json({
    success:true,
    message:"rating and review Upadated successfully", 
  })
}

  }catch(e){
    return res.status(500).json({
      success:false,
      message:"something went wrong please rating and review again", 
    })
  }
}

//get averaage rating

exports.getAverageRating=async(req,res)=>{
  try{
    //on the basis of all course id find all related rating 


    //get course id 

    const courseId=req.body.courseId;

    //calculate avg rating
    const result=await RatingAndReviews.aggregate([{
      $match:{
        course:new mongoose.Types.ObjectId(courseId),
      }
    },{
      $group:{
        _id:null,
        avgRating:{$avg:$rating}
      }
    }])



    //return rating

    if(result.length>0){
      return res.status(200).json({
        success:true,
       averageRating: result[0].averageRating,
      })
    }

    //if no rating exist 
    return res.status(200).json({
      success:true,
     averageRating: 0,
     message:"no rating given till now,average rating is 0 "
    })

  }catch(e){
    return res.status(500).json({
      success:false,
      message:"something went wrong please fetch average rating again", 
    })
  }

}

//get all rating
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    return res.status(200).json({
      success: true,
      data: allReviews,
      message: "All review fetched successfully",
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// get user's previous review for a course

exports.getUserReview = async (req, res) => {
  try {

    const userId = req.user.id;
    const { courseId } = req.params;


    const review = await RatingAndReviews.findOne({
      user: userId,
      course: courseId,
    });


    if (!review) {
      return res.status(200).json({
        success: true,
        review: null,
        message: "No previous review found",
      });
    }


    return res.status(200).json({
      success: true,
      review,
    });


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Unable to fetch user review",
    });

  }
};