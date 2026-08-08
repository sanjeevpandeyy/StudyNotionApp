const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const MailSender = async (email, title, body) => {
try {

console.log("MAIL_TO:", email);

console.log(
"RESEND_API_KEY exists:",
!!process.env.RESEND_API_KEY
);

const { data, error } = await resend.emails.send({
  from: process.env.EMAIL_FROM,
  to: [email],
  subject: title,
  html: `<div>${body}</div>`,
});

if (error) {
  console.error("Resend Error:", error);
  throw new Error(error.message);
}

console.log("Mail sent successfully");
console.log(data);

return data;

} catch (error) {

console.error("Mail Error:", error);
throw error;

}
};

module.exports = MailSender;