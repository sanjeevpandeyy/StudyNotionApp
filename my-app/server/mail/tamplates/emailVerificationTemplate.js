require("dotenv").config();

const emailVerificationTemplate = (name, otp) => {
return `

  <table width="100%" cellpadding="40">
      <tr>
          <td align="center">

              <table width="600" style="background:white;border-radius:12px;overflow:hidden;">

                  <tr>
                      <td align="center" style="background:#0F172A;padding:30px;">

                          <h2 style="color:white;">
                              StudyNotion
                          </h2>

                      </td>
                  </tr>

                  <tr>
                      <td style="padding:40px;">

                          <h2>Dear ${name},</h2>

                          <p>
                              Thank you for registering with StudyNotion.
                          </p>

                          <p>
                              Use the OTP below to verify your email address.
                          </p>

                          <div style="text-align:center;margin:35px 0;">

                              <span style="
                              font-size:34px;
                              letter-spacing:8px;
                              background:#EFF6FF;
                              padding:18px 35px;
                              border-radius:8px;
                              color:#2563EB;
                              font-weight:bold;
                              ">

                              ${otp}

                              </span>

                          </div>

                          <p>
                              This OTP will expire in <strong>5 minutes</strong>.
                          </p>

                          <p style="color:red;">
                              Never share this OTP with anyone.
                          </p>

                      </td>
                  </tr>

                  <tr>
                      <td style="background:#F8FAFC;padding:25px;text-align:center;">

                          ${process.env.EMAIL_FROM}

                      </td>
                  </tr>

              </table>

          </td>
      </tr>
  </table>

`;
}

module.exports = emailVerificationTemplate;