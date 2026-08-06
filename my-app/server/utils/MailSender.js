const nodemailer = require("nodemailer");
require("dotenv").config();
// Prefer IPv4 over IPv6
const dns = require("dns");

dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
  console.log("DNS Lookup:", err, addresses);
});

const MailSender = async (email, title, body) => {
  try {
    console.log("MAIL_HOST:", process.env.MAIL_HOST);
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);

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

      lookup(hostname, options, callback) {
        dns.lookup(hostname, { family: 4 }, callback);
      },
    });

    console.log("Verifying SMTP...");
    await transporter.verify();
    console.log("SMTP Verified");

    console.log("Sending mail to:", email);

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