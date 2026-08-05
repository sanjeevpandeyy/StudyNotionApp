const express=require("express");
const router=express.Router();


const {createCourse,showAllCourses,getCourseDetails,updateCourse,deleteCourse,submitCourseForApproval,getPendingCourses,approveCourse,rejectCourse,getFullCourseDetails,getInstructorCourses}=require("../controller/Course");
const {createCategory,showAllCategory,categoryPageDetails}=require("../controller/Category");
const{createSection,updateSection,deleteSection,}=require("../controller/Section");
const{createSubSection,updateSubSection,deleteSubSection,}=require("../controller/SubSection");
const{createRating,getAverageRating,getAllRating,getUserReview}=require("../controller/ratingAndReview");
const{auth,isInstructor,isStudent,isAdmin}=require("../middlewares/auth");
const {
  updateCourseProgress
} = require("../controller/courseProgress");



router.post("/updateCourse", auth, isInstructor, updateCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/createcategory",auth,isAdmin,createCategory);
router.post("/createcourse",auth,isInstructor,createCourse);

router.post("/createsubsection",auth,isInstructor,createSubSection);
router.post("/createSection",auth,isInstructor,createSection);
router.put("/updateSection",auth,isInstructor,updateSection);
router.put("/updateSubSection",auth,isInstructor,updateSubSection);

router.get("/showAllCourses",showAllCourses);
router.post("/getCourseDetails",getCourseDetails);

router.post("/deleteSection",auth,isInstructor,deleteSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);


router.post("/createrating",auth,isStudent,createRating);
router.get("/getAllRating",getAllRating);
router.get("/getAverageRating",getAverageRating);

router.get("/showallcategory",showAllCategory);
router.post("/categoryPageDetails",categoryPageDetails);
router.post("/getFullCourseDetails",auth,getFullCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.put(
  "/submitCourse",
  auth,
  isInstructor,
  submitCourseForApproval
);

//panding course for approval

router.get(
  "/pendingCourses",
  auth,
  isAdmin,
  getPendingCourses
);

router.put(
  "/approveCourse",
  auth,
  isAdmin,
  approveCourse
);

router.put(
  "/rejectCourse",
  auth,
  isAdmin,
  rejectCourse
);
router.get(
  "/getUserReview/:courseId",
  auth,
  getUserReview
);

router.post("/updateCourseProgress", (req, res, next) => {
  console.log("Route hit");
  next();
}, auth, isStudent, updateCourseProgress);

module.exports=router;