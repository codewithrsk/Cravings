import sendEmail from "../config/email.config.js";

export const sendOTPEmail = async (to, otp) => {
  const subject = "OTP to reset your Cravings Password";

  const message = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craving - Reset Your Password</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 15px;">
    <tr>
        <td align="center">

            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                    <td align="center" style="background:#ff6b35;padding:35px 20px;">

                        <img
                            src="https://res.cloudinary.com/bd7anuvy/image/upload/v1783777676/circleLogo_xteyey.png"
                            alt="Craving Logo"
                            width="80"
                            style="display:block;border-radius:50%;background:#ffffff;padding:6px;margin-bottom:15px;"
                        >

                        <h1 style="margin:0;color:#ffffff;font-size:30px;">
                            Craving
                        </h1>

                        <p style="margin:10px 0 0;color:#ffe9de;font-size:15px;">
                            Password Reset Verification
                        </p>

                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td style="padding:40px;">

                        <h2 style="margin:0;color:#222;">
                            Reset Password
                        </h2>

                        <p style="margin:20px 0;color:#555;font-size:16px;line-height:1.8;">
                            We received a request to reset the password for your <strong>Craving</strong> account.
                            Please use the verification code below to continue.
                        </p>

                        <!-- OTP -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td align="center">

                                    <div style="
                                        display:inline-block;
                                        background:#fff5f1;
                                        border:2px dashed #ff6b35;
                                        color:#ff6b35;
                                        padding:18px 45px;
                                        font-size:36px;
                                        font-weight:bold;
                                        letter-spacing:10px;
                                        border-radius:12px;
                                        margin:10px 0 25px;
                                    ">
                                        ${otp}
                                    </div>

                                </td>
                            </tr>
                        </table>

                        <div style="background:#fff8e8;border-left:5px solid #f59e0b;padding:18px;border-radius:8px;margin-top:20px;">
                            <strong style="color:#333;">Important</strong>
                            <ul style="margin:10px 0 0 18px;padding:0;color:#555;line-height:1.8;">
                                <li>This OTP is valid for <strong>5 minutes</strong>.</li>
                                <li>Never share this code with anyone.</li>
                                <li>Craving will never ask for your OTP.</li>
                            </ul>
                        </div>

                        <p style="margin-top:30px;color:#555;font-size:15px;line-height:1.8;">
                            If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged unless this OTP is used.
                        </p>

                        <p style="margin-top:30px;color:#444;font-size:15px;">
                            Stay secure,<br>
                            <strong>Team Craving</strong>
                        </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center" style="background:#fafafa;padding:25px;">

                        <p style="margin:0;color:#999;font-size:13px;">
                            © 2026 Craving. All rights reserved.
                        </p>

                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>`;

  await sendEmail(to, subject, message);
};

