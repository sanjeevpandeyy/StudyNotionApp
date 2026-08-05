require("dotenv").config();

const courseEnrollmentEmail = (name, courseName) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Course Enrollment</title>
  </head>

  <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0;">
          <tr>
              <td align="center">

                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

                      <tr>
                          <td align="center" style="background:#0F172A;padding:30px;">
                              <img src="https://via.placeholder.com/140x45?text=StudyNotion" loading="lazy" width="140" alt="StudyNotion Logo" />
                              <h2 style="color:white;margin-top:15px;">StudyNotion</h2>
                          </td>
                      </tr>

                      <tr>
                          <td style="padding:40px;">

                              <h2 style="color:#222;">
                                  Congratulations ${name}! 🎉
                              </h2>

                              <p style="color:#555;font-size:16px;line-height:1.7;">
                                  You have successfully enrolled in the course:
                              </p>

                              <div style="background:#EEF4FF;padding:18px;border-left:5px solid #3B82F6;font-size:20px;font-weight:bold;color:#1E3A8A;">
                                  ${courseName}
                              </div>

                              <p style="margin-top:30px;color:#555;line-height:1.8;">
                                  Your learning journey starts now. Log in to your account and begin exploring the course content.
                              </p>

                              <a href="#" style="display:inline-block;margin-top:25px;padding:14px 30px;background:#2563EB;color:white;text-decoration:none;border-radius:8px;">
                                  Go To Dashboard
                              </a>

                          </td>
                      </tr>

                      <tr>
                          <td style="background:#F8FAFC;padding:25px;text-align:center;color:#666;">
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

module.exports = courseEnrollmentEmail;

