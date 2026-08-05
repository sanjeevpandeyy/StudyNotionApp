const mongoose=require("mongoose");
const MailSender = require("../utils/MailSender");
const emailVerificationTemplate = require("../mail/tamplates/emailVerificationTemplate");


const OTPSchema=new mongoose.Schema({
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60,
  },
  OTP:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },

});



async function sendVerificationOnEmail(email,otp){
  try{

    const body = emailVerificationTemplate("User", otp);
    const mailResponse= await MailSender(
      email,
      "Verification Email",
      body
  );

    console.log("mail sent successfully ",mailResponse);

  }catch(e){
    console.log("error occure while sending mails",e)
    throw e;
  }
}


OTPSchema.pre("save",async function(){
  await sendVerificationOnEmail(this.email,this.OTP);
})

module.exports= mongoose.model("OTP",OTPSchema);

