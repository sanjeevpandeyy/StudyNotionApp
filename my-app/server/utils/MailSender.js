const nodemailr=require("nodemailer");
require("dotenv").config();

const MailSender=async (email,title,body)=>{
  try{
    const tranporter= nodemailr.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
      }
    })

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
    throw error;
  }
}

module.exports=MailSender;