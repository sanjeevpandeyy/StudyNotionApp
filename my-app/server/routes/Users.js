const express=require("express");
const router=express.Router();


const{sendOtp,signUp,login,changePassword}=require("../controller/Auth");
const{resetPasswordToken,resetPassword}=require("../controller/ResetPassword");
const{auth}=require("../middlewares/auth");




router.post("/login",login);
router.post("/changepassword",auth,changePassword);
router.post("/signup",signUp);
router.post("/sendotp",sendOtp);
router.post("/reset-password-token",resetPasswordToken);
router.post("/reset-password",resetPassword);



module.exports=router;
