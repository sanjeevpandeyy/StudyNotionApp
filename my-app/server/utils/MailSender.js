const nodemailer = require("nodemailer");
require("dotenv").config();

const MailSender = async (email, title, body) => {
  try {
    console.log("MAIL_HOST:", process.env.MAIL_HOST);
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
      from: "StudyNotion - by Sanjeev",
      to: email,
      subject: title,
      html: `<div>${body}</div>`,
    });

    console.log("After sendMail");

    console.log(info);
    return info;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = MailSender;