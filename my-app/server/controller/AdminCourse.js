const Course = require("../model/Course");


// Get Pending Courses
exports.getPendingCourses = async(req,res)=>{
    try{

        const courses = await Course.find({
            status:"PendingApproval"
        })
        .populate("instructor","firstName lastName email image")
        .populate("category","name");


        if(courses.length===0){
            return res.status(404).json({
                success:false,
                message:"No pending courses found"
            });
        }


        return res.status(200).json({
            success:true,
            message:"Pending courses fetched successfully",
            data:courses
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to fetch pending courses"
        });
    }
};



// Approve Course
exports.approveCourse = async(req,res)=>{
    try{

        const {courseId}=req.body;


        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course id required"
            });
        }


        const course = await Course.findById(courseId);


        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            });
        }


        if(course.status!=="PendingApproval"){
            return res.status(400).json({
                success:false,
                message:"Only pending courses can be approved"
            });
        }


        course.status="Published";
        course.approvedBy=req.user.id;
        course.publishedAt=new Date();


        await course.save();


        return res.status(200).json({
            success:true,
            message:"Course approved successfully",
            data:course
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to approve course"
        });
    }
};



// Reject Course
exports.rejectCourse = async(req,res)=>{
    try{

        const {
            courseId,
            rejectionReason
        }=req.body;


        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course id required"
            });
        }


        if(!rejectionReason){
            return res.status(400).json({
                success:false,
                message:"Rejection reason required"
            });
        }


        const course = await Course.findById(courseId);


        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            });
        }


        if(course.status!=="PendingApproval"){
            return res.status(400).json({
                success:false,
                message:"Only pending courses can be rejected"
            });
        }


        course.status="Rejected";
        course.rejectionReason=rejectionReason;


        await course.save();


        return res.status(200).json({
            success:true,
            message:"Course rejected successfully",
            data:course
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to reject course"
        });
    }
};