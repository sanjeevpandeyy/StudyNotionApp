const User=require("../model/User");
const Course=require("../model/Course");
const Profile=require("../model/Profile");


// Admin Analytics
exports.getAnalytics=async(req,res)=>{
    try{
        const totalUsers=await User.countDocuments();
        const totalStudents=await User.countDocuments({
            accountType:"Student"
        });
        const totalInstructors=await User.countDocuments({
            accountType:"Instructor"
        });
        const totalCourses=await Course.countDocuments();
        const publishedCourses=await Course.countDocuments({
            status:"Published"
        });
        const pendingCourses=await Course.countDocuments({
            status:"PendingApproval"
        });
        const rejectedCourses=await Course.countDocuments({
            status:"Rejected"
        });
        const enrollmentData=await Course.aggregate([
            {
                $project:{
                    totalStudents:{
                        $size:"$studentEnrolled"
                    }
                }
            },
            {
                $group:{
                    _id:null,
                    totalEnrollments:{
                        $sum:"$totalStudents"
                    }
                }
            }
        ]);
        const totalEnrollments =
        enrollmentData[0]?.totalEnrollments || 0;
        const revenueData=await Course.aggregate([
            {
                $project:{
                    revenue:{
                        $multiply:[
                            "$price",
                            {
                                $size:"$studentEnrolled"
                            }
                        ]
                    }
                }
            },
            {
                $group:{
                    _id:null,
                    totalRevenue:{
                        $sum:"$revenue"
                    }
                }
            }
        ]);
        const totalRevenue =
        revenueData[0]?.totalRevenue || 0;

        return res.status(200).json({
            success:true,
            message:"Analytics fetched successfully",
            data:{
                totalUsers,
                totalStudents,
                totalInstructors,
                totalCourses,
                publishedCourses,
                pendingCourses,
                rejectedCourses,
                totalEnrollments,
                totalRevenue
            }
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to fetch analytics"
        });
    }
};