const OTP=require("../model/OTP");
const User=require("../model/User");
const otpgenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Profile=require("../model/Profile");
const JWT=require("jsonwebtoken");
require("dotenv").config();

//sendotp 
exports.sendOtp=async (req,res)=>{
  console.log("=== SEND OTP API HIT ===");
  try{
    
    const{email}=req.body;
    //check if user already exist
    const checkUserPresent=await User.findOne({email});
    if(checkUserPresent){
      return res.status(401).json({
        success:false,
        message:"User already exist",
      })
    }
    // Bad approach for geting otp use library for otp using loop is wrong approach

    var otp=otpgenerator.generate(6,{
      upperCaseAlphabets: false,
       lowerCaseAlphabets: false, 
       specialChars: false,
    })
  

    //check unique otp or not
    let result =await OTP.findOne({OTP:otp})
    while(result){
      otp=otpgenerator.generate(6,{
        upperCaseAlphabets: false,
         lowerCaseAlphabets: false, 
         specialChars: false,
      })

      result =await OTP.findOne({OTP:otp})
    }
    console.log("OTP->",otp);

    const otpPayload={email,OTP: otp};

    //create and entry in otp
    const otpBody=await OTP.create(otpPayload);


    //return success response
    return res.status(200).json({
      success:true,
      message:"OTP sent Successfully",
    })


  }catch(e){
    console.log(e);
    return res.status(500).json({
      success:false,
      message:e.message,
    })
  }

}



exports.signUp=async (req,res)=>{

  try{
    //data fetch from request body

    const {firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body;
    
  //velidation data
  if(!firstName||!email||!password||!confirmPassword||!accountType||!otp){
    return res.status(403).json({
      success:false,
    message:"All fields are required",
    })
  }

  // match confirm password 

  if(password!==confirmPassword){
    return res.status(400).json({
      success:false,
    message:"Password and confirm Password value not matched please try again",
    })
  }
  //check user already exist or not 
  const userExist=await User.findOne({email});
  if(userExist){
    return res.status(400).json({
    success:false,
    message:"User is already registered ",
    })
  }

  //find most recent otp for user
  const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

// Check if OTP exists
if (!recentOtp) {
  return res.status(400).json({
    success: false,
    message: "OTP has expired. Please generate a new OTP.",
  });
}

// Validate OTP
if (recentOtp.OTP !== otp) {
  return res.status(400).json({
    success: false,
    message: "Invalid OTP.",
  });
}

// OTP is valid
console.log("OTP Verified Successfully");
  
  //hash password

  const hashedPassword=await bcrypt.hash(password,10);

  //additional details
  const ProfileDetails= await Profile.create({
    gender:null,
    dateOfBirth:null,
    about:null,
    contectNunber:null,
    })
  
    let image;
    if(lastName){
      image=`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`;
    }else{
        const word=firstName;
      image=`https://api.dicebear.com/5.x/initials/svg?seed=${word[0]}${word[1]}`;
    }
  //entry create in db
  const user=await User.create({
    firstName,
    lastName,
    email,
    password:hashedPassword,
    accountType,
    additionalDetails: ProfileDetails._id,
    image,
  })

  await OTP.deleteMany({ email });

  return res.status(200).json({
    success:true,
    message:"User is registered successfully",
    user,
  })
  }
  catch(e){
    return res.status(400).json({
      success:false,
      message:"registration failed please try again",
      })
  }

}


exports.login=async (req,res)=>{
  try{
    const{email,password}=req.body;

    //data validation
    if(!email||!password){
      return res.status(403).json({
        success:false,
        message:"all fieled required ",

      })
    }

    //check user exist 
     const userExist=await User.findOne({email});
    if(!userExist){
      return res.status(401).json({
        success:false,
        message:"User is not registered ",
      })
    }

    const user=userExist.toObject();
    //password match with hashPassword by validation

    const passValid=await bcrypt.compare(password,user.password);
    if(!passValid){
      return res.status(403).json({
        success:false,
        message:"incorrect password ",

      })
    }

    //generate JWT 
    const payload={
      email:user.email,
      id:user._id,
      accountType:user.accountType,
    }
    const token=JWT.sign(payload,process.env.JWT_SECRET,{
      expiresIn:"2h"
    });

    user.token=token;
    user.password=undefined;

    //create cookie and send response

    const options={
      expires:new Date(Date.now()+3*24*60*60*1000),
      httpOnly:true,
    }

    return res.status(200).json({
      success: true,
      token,
      user,
    });

  }catch(e){
    console. log (e);
     return res.status(500).json({
        success: false,
        message: 'Login Failure, please try again',
      })
  }


}

//change password

exports.changePassword=async (req,res)=>{

  try{
    const Id = req.user.id;
    const {currentPassword,newPassword,confirmNewPassword}=req.body;
    //validation of inputs
    if(!currentPassword||!newPassword||!confirmNewPassword){
      return res.status(403).json({
        success:false,
        message:"All filled required",
      })
    }
    //user exist 
    const userExist=await User.findById(Id);
    if(!userExist){
      return res.status(401).json({
        success:false,
        message:"User not exist please enter correct email",
      })
    }
  
    if(newPassword!==confirmNewPassword){
      return res.status(401).json({
        success:false,
        message:"new password not matched",
      })
    }
  
    //velidate current password
    const passValid=await bcrypt.compare(currentPassword,userExist.password);
    if(!passValid){
      return res.status(401).json({
        success:false,
        message:"Enter correct password",
      })
    }
    
    //hash new password 
    const hashedNewPassword=await bcrypt.hash(newPassword,10);
    //change password

    const updatedUser=await User.findByIdAndUpdate(Id,{password:hashedNewPassword},{
      new: true,
    });
  
    return res.status(200).json({
      success:true,
      message:"password chnages successfully",
      data:updatedUser
    })
  }catch(e){
    console.log(e);
    return res.status(500).json({
      success:false,
      message:"Password exchange failed, please try again",
    })

  }
}