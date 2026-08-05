const Course=require("../model/Course");
const Category=require("../model/category");
const User=require("../model/User");
const ImageUploaderToCloudinary=require("../utils/ImageUploader");
const CourseProgress = require("../model/CoursesProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();


//create course 
exports.createCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      category,
      tag,
      price,
      instructions,
    } = req.body;

    const thumbnail = req.files?.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !category ||
      !price ||
      !thumbnail ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check instructor
    const instructorDetails = await User.findById(instructorId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // Check category
    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Upload thumbnail
    const thumbnailImage = await ImageUploaderToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // Create Course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      instructor: instructorId,
      price,
      category,
      thumbnail: thumbnailImage.secure_url,

      // Keep these according to your schema
      tag,
      instructions: instructions ? JSON.parse(instructions) : [],

      // Explicitly create as Draft
      status: "Draft",
    });

    // Add course to instructor
    await User.findByIdAndUpdate(
      instructorId,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // Add course to category
    await Category.findByIdAndUpdate(
      category,
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

//get All courses
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },
      {
        courseName: 1,
        price: 1,
        thumbnail: 1,
        instructor: 1,
        ratingAndReviews: 1,
        studentEnrolled: 1,
      }
    ).populate("instructor", "firstName lastName image")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All published courses fetched successfully",
      data: allCourses,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Could not fetch courses",
    });
  }
};

//entire data of a course 

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find the course with id ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: {
        courseDetails,
        totalDuration: "0h 0m", // calculate later
      },
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: `Something went wrong ${e.message}`,
    });
  }
};

//update courses
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Only course owner can edit
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Build update object
    const updateData = {};

    if (req.body.courseName)
      updateData.courseName = req.body.courseName;

    if (req.body.courseDescription)
      updateData.courseDescription = req.body.courseDescription;

    if (req.body.whatYouWillLearn)
      updateData.whatYouWillLearn = req.body.whatYouWillLearn;

    if (req.body.price)
      updateData.price = req.body.price;

    if (req.body.category)
      updateData.category = req.body.category;

    if (req.body.tag) {
      updateData.tag = req.body.tag;
    }

    if (req.body.instructions) {
      updateData.instructions = JSON.parse(req.body.instructions);
    }

    // Upload thumbnail if provided
    if (req.files && req.files.thumbnailImage) {
      const thumbnail = await ImageUploaderToCloudinary(
        req.files.thumbnailImage,
        process.env.FOLDER_NAME
      );

      updateData.thumbnail = thumbnail.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updateData,
      {
        new: true,
      }
    )
      .populate("category")
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//delete course

exports.deleteCourse = async (req, res) => {
  try {
      const { courseId } = req.body;

      const course = await Course.findById(courseId);

      if (!course) {
          return res.status(404).json({
              success: false,
              message: "Course not found",
          });
      }

      await User.findByIdAndUpdate(course.instructor, {
          $pull: {
              courses: course._id,
          },
      });

      await Category.findByIdAndUpdate(course.category, {
          $pull: {
              course: course._id,
          },
      });

      await Course.findByIdAndDelete(courseId);

      return res.status(200).json({
          success: true,
          message: "Course deleted successfully",
      });

  } catch (err) {
      return res.status(500).json({
          success: false,
          message: err.message,
      });
  }
};

//submit for approval
exports.submitCourseForApproval = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.status = "PendingApproval";
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course submitted successfully",
      data: course,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//pending courses

exports.getPendingCourses = async (req, res) => {

  try {

      const courses = await Course.find({
          status: "PendingApproval",
      })
          .populate("instructor")
          .populate("category");

      return res.status(200).json({
          success: true,
          data: courses,
      });

  } catch (err) {

      return res.status(500).json({
          success: false,
          message: err.message,
      });

  }
};

//approve course
exports.approveCourse = async (req, res) => {

  try {

      const { courseId } = req.body;

      const course = await Course.findById(courseId);

      if (!course) {
          return res.status(404).json({
              success: false,
              message: "Course not found",
          });
      }

      course.status = "Published";

      course.approvedBy = req.user.id;

      course.publishedAt = new Date();

      await course.save();

      return res.status(200).json({
          success: true,
          message: "Course approved successfully",
      });

  } catch (err) {

      return res.status(500).json({
          success: false,
          message: err.message,
      });

  }
};

//reject course 

exports.rejectCourse = async (req, res) => {

  try {

      const { courseId, reason } = req.body;

      const course = await Course.findById(courseId);

      if (!course) {
          return res.status(404).json({
              success: false,
              message: "Course not found",
          });
      }

      course.status = "Rejected";

      course.rejectionReason = reason;

      await course.save();

      return res.status(200).json({
          success: true,
          message: "Course rejected",
      });

  } catch (err) {

      return res.status(500).json({
          success: false,
          message: err.message,
      });

  }
};

//full course details 

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    const courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    console.log("courseProgressCount:", courseProgressCount);

    let totalDurationInSeconds = 0;

    courseDetails.courseContent.forEach((section) => {
      section.subSection.forEach((subSection) => {
        totalDurationInSeconds += parseInt(subSection.timeDuration);
      });
    });

    const totalDuration = convertSecondsToDuration(
      totalDurationInSeconds
    );

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos:
          courseProgressCount?.completedVideos || [],
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch course details",
      error: error.message,
    });
  }
};
// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}