const User = require("../model/User");
const Course = require("../model/Course");


// Admin Dashboard
exports.getAdminDashboard = async(req,res)=>{
    try{

        const totalUsers = await User.countDocuments();
        const totalCourses = await Course.countDocuments();
        const publishedCourses = await Course.countDocuments({
            status:"Published"
        });
        const pendingCourses = await Course.countDocuments({
            status:"PendingApproval"
        });

        return res.status(200).json({
            success:true,
            message:"Dashboard data fetched successfully",
            data:{
                totalUsers,
                totalCourses,
                publishedCourses,
                pendingCourses
            }
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to fetch dashboard data"
        });
    }
};


// Get All Users
exports.getAllUsers = async(req,res)=>{
    try{

        const users = await User.find({})
        .select("-password")
        .populate("additionalDetails");


        if(users.length===0){
            return res.status(404).json({
                success:false,
                message:"No users found"
            });
        }


        return res.status(200).json({
            success:true,
            message:"Users fetched successfully",
            data:users
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to fetch users"
        });
    }
};


// Get Students
exports.getAllStudents = async(req,res)=>{
    try{

        const students = await User.find({
            accountType:"Student"
        })
        .select("-password");


        if(students.length===0){
            return res.status(404).json({
                success:false,
                message:"No students found"
            });
        }


        return res.status(200).json({
            success:true,
            message:"Students fetched successfully",
            data:students
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to fetch students"
        });
    }
};


// Get Instructors
exports.getAllInstructors = async(req,res)=>{
    try{

        const instructors = await User.find({
            accountType:"Instructor"
        })
        .select("-password")
        .populate("courses");


        if(instructors.length===0){
            return res.status(404).json({
                success:false,
                message:"No instructors found"
            });
        }


        return res.status(200).json({
            success:true,
            message:"Instructor fetched successfully",
            data:instructors
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to fetch instructors"
        });
    }
};


// Delete User
exports.deleteUser = async(req,res)=>{
    try{

        const {userId}=req.body;

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User id required"
            });
        }


        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }


        if(user._id.toString()===req.user.id){
            return res.status(403).json({
                success:false,
                message:"Admin cannot delete own account"
            });
        }


        await User.findByIdAndDelete(userId);


        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to delete user"
        });
    }
};


// Search Students

exports.searchStudents = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const students = await User.find({
      accountType: "Student",
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
      .populate("additionalDetails")
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: students,
      message: "Students fetched successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error while searching students",
      error: error.message,
    });
  }
};


// Search Instructors

exports.searchInstructors = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const instructors = await User.find({
      accountType: "Instructor",
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
      .populate("additionalDetails")
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: instructors,
      message: "Instructors fetched successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error while searching instructors",
      error: error.message,
    });
  }
};