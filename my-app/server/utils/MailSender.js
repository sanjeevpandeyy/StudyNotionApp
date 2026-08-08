const { BrevoClient } = require("@getbrevo/brevo");
require("dotenv").config();

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const MailSender = async (email, title, body) => {
  try {

    console.log("MAIL_TO:", email);

    console.log(
      "BREVO_API_KEY exists:",
      !!process.env.BREVO_API_KEY
    );

    const data =
      await brevo.transactionalEmails.sendTransacEmail({

        sender: {
          name: process.env.MAIL_FROM_NAME,
          email: process.env.EMAIL_FROM,
        },

        to: [
          {
            email: email,
          },
        ],

        subject: title,

        htmlContent: `<div>${body}</div>`,
      });

    console.log("Mail sent successfully");
    console.log(data);

    return data;

  } catch (error) {

    console.error("Mail Error:", error);

    throw error;
  }
};

module.exports = MailSender;