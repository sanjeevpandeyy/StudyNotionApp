const Profile=require("../model/Profile");
const User=require("../model/User");
const Course=require("../model/Course");
const uploadImageToCloudinary=require("../utils/ImageUploader");
const CourseProgress = require("../model/CoursesProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");


exports.updateProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const {
      firstName,
      lastName,
      about,
      gender,
      dateOfBirth,
      contactNumber,
    } = req.body;


    // Same validation as your code
    if (!about && !gender && !dateOfBirth && !contactNumber && !firstName && !lastName) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update.",
      });
    }


    // Find logged-in user
    const user = await User.findById(id);

    console.log("User:", user);
    console.log("Profile ID:", user?.additionalDetails);


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }


    // Check profile exists
    if (!user.additionalDetails) {
      return res.status(404).json({
        success: false,
        message: "Profile ID not found in user document.",
      });
    }



    // Update User collection
    const userData = {};

    if (firstName) {
      userData.firstName = firstName;
    }

    if (lastName) {
      userData.lastName = lastName;
    }


    let updatedUser = user;

    if (Object.keys(userData).length > 0) {

      updatedUser = await User.findByIdAndUpdate(
        id,
        userData,
        {
          new: true,
        }
      );
    }



    // Update Profile collection
    const updatedData = {};


    if (about) {
      updatedData.about = about;
    }

    if (gender) {
      updatedData.gender = gender;
    }

    if (dateOfBirth) {
      updatedData.dateOfBirth = dateOfBirth;
    }

    if (contactNumber) {
      updatedData.contactNumber = contactNumber;
    }



    let updatedProfile = user.additionalDetails;


    if (Object.keys(updatedData).length > 0) {

      updatedProfile = await Profile.findByIdAndUpdate(
        user.additionalDetails,
        updatedData,
        {
          new: true,
          runValidators: true,
        }
      );
    }



    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }



    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();



    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: userDetails,
    });



  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// delete account


exports.deleteAccount=async(req,res)=>{
  try{
    //get id
    const id=req.user.id;
    // velidation
    const userDetails=await User.findById(id);
    if(!userDetails){
      return res.status(404).json({
        success:false,
        message:"User not found",
      })
    }

    //profile delete
    await Profile.findByIdAndDelete(userDetails.additionalDetails);

    //delete from enrolled student 

    for (const courseId of userDetails.courses || []) {
      await Course.findByIdAndUpdate(courseId,{
        $pull:{
          studentEnrolled:id,
        }
      })
    }

    //delete user 
    await User.findByIdAndDelete(id);

    //return response
    return res.status(200).json({
      success:true,
      message:"profile deleted successfully "
    })
  }catch(e){
    return res.status(500).json({
      success:false,
      message:"something went wrong during profile deletion, please try again !"
    })
  }
}

//get all user details

exports.getAllUserDetails = async (req, res) => {
  try {
    // Get logged-in user ID
    const id = req.user.id;

    // Find user and populate profile details
    const user = await User.findById(id)
      .populate("additionalDetails")
      .populate("courses")
      .exec();

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user details.",
      error: error.message,
    });
  }
};

//update profile picture 
exports.updateProfilePicture=async (req,res)=>{
  try{
    const id=req.user.id;
    const profilePicture=req.files?.profilePicture;
    if(!profilePicture){
      return res.status(400).json({
        success: false,
        message: "please upload profile picture ",
      });
    }
      //upload video to cloudinary
      const uploaddetails=await uploadImageToCloudinary(profilePicture,process.env.FOLDER_NAME);

      //fetch secure_url
      const imageUrl=uploaddetails.secure_url;
    const updatedProfile=await User.findByIdAndUpdate(id,{image:imageUrl});
    return res.status(200).json({
      success: true,
      message: "User profile picture updated successfully.",
      data: updatedProfile,
    });
    

  }catch(e){
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile picture.",
      error: e.message,
    });
  }
};


//get enrolled courses 


exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    let user = await User.findById(userId)
      .select("courses")
      .populate({
        path: "courses",
        populate: [
          {
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          },
          {
            path: "category",
          },
          {
            path: "ratingAndReviews",
            populate: {
              path: "user",
              select: "firstName lastName image",
            },
          },
          {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        ],
      })
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    for (let i = 0; i < user.courses.length; i++) {
      const course = user.courses[i];

      // -----------------------------
      // Calculate total duration
      // -----------------------------
      let totalDurationInSeconds = 0;
      let totalSubSections = 0;

      course.courseContent.forEach((section) => {
        section.subSection.forEach((subSection) => {
          totalDurationInSeconds += Number(subSection.timeDuration || 0);
          totalSubSections++;
        });
      });

      course.totalDuration = convertSecondsToDuration(
        totalDurationInSeconds
      );

      // -----------------------------
      // Calculate progress
      // -----------------------------
      const courseProgress = await CourseProgress.findOne({
        courseID: course._id,
        userId: userId,
      });

      let progressPercentage = 0;

      if (courseProgress && totalSubSections > 0) {
        progressPercentage =
          (courseProgress.completedVideos.length / totalSubSections) * 100;
      }

      course.progressPercentage = Number(
        progressPercentage.toFixed(2)
      );
    }

    return res.status(200).json({
      success: true,
      message: "Enrolled courses fetched successfully",
      data: user.courses,
    });
  } catch (error) {
    console.error("Error in getEnrolledCourses:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
      error: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {

    const courseDetails = await Course.find({
      instructor: req.user.id
    });


    const courseData = courseDetails.map((course) => {

      const totalStudentsEnrolled =
        course.studentEnrolled?.length || 0;


      const totalAmountGenerated =
        totalStudentsEnrolled * (course.price || 0);


      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

    });


    return res.status(200).json({
      success:true,
      courses:courseData
    });


  } catch(error){

    console.log("INSTRUCTOR DASHBOARD ERROR:", error);

    return res.status(500).json({
      success:false,
      message:error.message
    });

  }
};
