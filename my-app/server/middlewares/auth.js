const JWT=require("jsonwebtoken");
require("dotenv").config();
const User=require("../model/User");


//auth

exports.auth=(req,res,next)=>{

  try{
  

    //extract token
    const token =
  req.body?.token ||
  req.cookies?.token ||
  req.header("Authorization")?.replace("Bearer ", "");

console.log("Authorization Header:", req.headers.authorization);
console.log("Cookie Token:", req.cookies.token);
console.log("Extracted Token:", token);


    if(!token){
      return res.status(401).json({
        success:false,
        message:"token is missing",
      });
    }

    //token verify
    try{
      const decode=JWT.verify(token,process.env.JWT_SECRET);
      console.log("decode",decode)
      req.user=decode;
    }catch (e) {
      console.log("JWT VERIFY ERROR:", e.message);
    
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  }catch(e){
    return res.status(401).json({
      success:false,
      message:"something went wrong while velidating the token",
    });
  }
  
}

//is student

exports.isStudent=(req,res,next)=>{

  try{
     console.log("USER ACCOUNT TYPE:", req.user.accountType);
  if(req.user.accountType !== "Student"){
    return res.status(401).json({
      success:false,
      message:"this is prodected route for student only",
    });
  }
    next();
  }catch(e){
    return res.status(401).json({
      success:false,
      message:"user Role can not be verified",
    });
  }
  
}

//is instructor
exports.isInstructor=(req,res,next)=>{

  try{
    
  if(req.user.accountType !== "Instructor"){
    return res.status(401).json({
      success:false,
      message:"this is prodected route for Instructor only",
    });
  }
    next();
  }catch(e){
    return res.status(401).json({
      success:false,
      message:"user Role can not be verified",
    });
  }
  
}

// is admin
exports.isAdmin=(req,res,next)=>{

  try{
    
  if(req.user.accountType !== "Admin"){
    return res.status(401).json({
      success:false,
      message:"this is prodected route for Admin only",
    });
  }
    next();
  }catch(e){
    return res.status(401).json({
      success:false,
      message:"user Role can not be verified",
    });
  }
  
}


