require("dotenv").config();
const passwordUpdate = (name) => {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;background:#F5F7FA;font-family:Arial,sans-serif;">

      <table width="100%" cellpadding="40">
          <tr>
              <td align="center">

                  <table width="600" style="background:white;border-radius:12px;overflow:hidden;">

                      <tr>
                          <td align="center" style="background:#0F172A;padding:30px;">
                              <img src="https://via.placeholder.com/140x45?text=StudyNotion" loading="lazy">
                              <h2 style="color:white;">StudyNotion</h2>
                          </td>
                      </tr>

                      <tr>
                          <td style="padding:40px;">

                              <h2>Password Updated Successfully</h2>

                              <p>Hello ${name},</p>

                              <p>
                                  Your StudyNotion account password has been changed successfully.
                              </p>

                              <div style="background:#ECFDF5;padding:20px;border-left:5px solid #10B981;margin:25px 0;">
                                  ✅ Your password has been updated.
                              </div>

                              <p>
                                  If you did not perform this action, please reset your password immediately and contact our support team.
                              </p>

                          </td>
                      </tr>

                      <tr>
                          <td style="background:#F8FAFC;padding:25px;text-align:center;">
                              Regards,<br>
                              <strong>${process.env.MAIL_FROM_NAME}</strong><br>
                              ${process.env.MAIL_USER}
                          </td>
                      </tr>

                  </table>

              </td>
          </tr>
      </table>

  </body>
  </html>
  `;
};

module.exports = passwordUpdate;