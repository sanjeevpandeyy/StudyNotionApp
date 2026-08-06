const nodemailer = require("nodemailer");
const dns = require("dns");
require("dotenv").config();

const MailSender = async (email, title, body) => {
  try {
    console.log("MAIL_HOST:", process.env.MAIL_HOST);
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);

    // Print all DNS records
    dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
      if (err) {
        console.log("DNS Lookup Error:", err);
      } else {
        console.log("DNS Lookup:", addresses);
      }
    });

    // Wait 2 seconds so DNS logs appear first
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,

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

    console.log("Sending Mail...");

    const info = await transporter.sendMail({
      from: `"StudyNotion - by Sanjeev" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: `<div>${body}</div>`,
    });

    console.log("Mail Sent Successfully");
    console.log(info);

    return info;
  } catch (error) {
    console.error("Mail Error:", error);
    throw error;
  }
};

module.exports = MailSender;