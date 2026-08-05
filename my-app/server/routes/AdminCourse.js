const express=require("express");
const router=express.Router();

const {
    getPendingCourses,
    approveCourse,
    rejectCourse
}=require("../controller/AdminCourse");

const {
    auth,
    isAdmin
}=require("../middlewares/auth");


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


module.exports=router;