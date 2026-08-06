const nodemailr=require("nodemailer");
require("dotenv").config();

const MailSender=async (email,title,body)=>{
  try{
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info=await tranporter.sendMail({
      from:"StudyNotion - by sanjeev",
      to:email,
      subject:`${title}`,
      html:`<div>${body}</div>`,


    })
    console.log(info);
    return info;

  }catch(e){
    console.log(e);
    throw e;
  }
}

module.exports=MailSender;