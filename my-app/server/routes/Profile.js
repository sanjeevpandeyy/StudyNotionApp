const express=require("express");
const router=express.Router();
const{updateProfile,deleteAccount,getAllUserDetails,getEnrolledCourses,updateProfilePicture,instructorDashboard}=require("../controller/Profile");
const { auth ,isInstructor} = require("../middlewares/auth");



router.get("/getAllUserDetails",auth,getAllUserDetails);
router.get("/getEnrolledCourse",auth,getEnrolledCourses);
router.put("/updateProfile",auth,updateProfile);
router.put("/updateProfilePicture",auth,updateProfilePicture);
router.delete("/deleteAccount",auth,deleteAccount);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports=router;
