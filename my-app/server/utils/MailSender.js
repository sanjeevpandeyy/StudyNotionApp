const nodemailer = require("nodemailer");
require("dotenv").config();

const MailSender = async (email, title, body) => {
  try {
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    console.log("Verifying SMTP...");
    await transporter.verify();
    console.log("SMTP Verified");

    const info = await transporter.sendMail({
      from: `"StudyNotion - by Sanjeev" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: `<div>${body}</div>`,
    });

    console.log("Mail sent successfully");
    console.log(info);

    return info;
  } catch (error) {
    console.error("Mail Error:", error);
    throw error;
  }
};

module.exports = MailSender;