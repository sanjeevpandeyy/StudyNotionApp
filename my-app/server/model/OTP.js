const mongoose = require("mongoose");
const MailSender = require("../utils/MailSender");
const emailVerificationTemplate = require("../mail/tamplates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },

  OTP: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

});


// ============================================
// SEND VERIFICATION EMAIL
// ============================================

async function sendVerificationOnEmail(email, otp) {

  try {

    console.log("Before MailSender");

    const body = emailVerificationTemplate("User", otp);

    console.log("Just Before MailSender");

    const mailResponse = await MailSender(
      email,
      "Verification Email",
      body
    );

    console.log(
      "Mail sent successfully:",
      mailResponse
    );

  } catch (e) {

    console.error(
      "Error occurred while sending mail:",
      e
    );

    throw e;
  }

}


// ============================================
// PRE SAVE HOOK
// ============================================

OTPSchema.pre("save", async function () {

  await sendVerificationOnEmail(
    this.email,
    this.OTP
  );

});


module.exports = mongoose.model("OTP", OTPSchema);