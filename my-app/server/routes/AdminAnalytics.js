const express=require("express");
const router=express.Router();

const {
    getAnalytics
}=require("../controller/AdminAnalytics");

const {
    auth,
    isAdmin
}=require("../middlewares/auth");


router.get(
"/analytics",
auth,
isAdmin,
getAnalytics
);


module.exports=router;