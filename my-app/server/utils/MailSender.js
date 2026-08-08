const brevo = require("@getbrevo/brevo");
require("dotenv").config();

const MailSender = async (email, title, body) => {
  try {
    console.log("MAIL_TO:", email);
    console.log(
      "BREVO_API_KEY exists:",
      !!process.env.BREVO_API_KEY
    );

    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = title;

    sendSmtpEmail.htmlContent = `<div>${body}</div>`;

    sendSmtpEmail.sender = {
      name: process.env.MAIL_FROM_NAME,
      email: process.env.EMAIL_FROM,
    };

    sendSmtpEmail.to = [
      {
        email: email,
      },
    ];

    const data = await apiInstance.sendTransacEmail(
      sendSmtpEmail
    );

    console.log("Mail sent successfully");
    console.log(data);

    return data;
  } catch (error) {
    console.error("Mail Error:", error);
    throw error;
  }
};

module.exports = MailSender;