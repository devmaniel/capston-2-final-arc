const UserModel = require("../../model/user");
const OTPModel = require("../../model/OTP");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const moment = require("moment");
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
}

async function mailOTP(email, validCode) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "melcoschool@gmail.com",
      pass: "azck xesp zfgo wwtr ",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Forgot Password Assistance",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset Request</title>
        <style>
          body, h2, p, a { font-family: Arial, sans-serif; }
          .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
          }
          .logo { display: block; margin: 0 auto 20px; height: 150px; }
          .title { font-size: 24px; font-weight: bold; color: #1f2937; text-align: center; margin-bottom: 10px; }
          .message { font-size: 14px; color: #4b5563; text-align: center; margin-bottom: 20px; }
          .button {
            display: inline-block; padding: 10px 20px; background-color: #283790;
            color: #ffffff; font-weight: 600; border-radius: 5px; text-decoration: none;
            text-align: center; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .footer { font-size: 12px; color: #6b7280; text-align: center; margin-top: 20px; }
          .footer .small-text { font-size: 10px; }
        </style>
      </head>
      <body style="background-color: #f9fafb; padding: 20px;">
        <div class="container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUQ-gcLN9gTUlPjmgpRQiy2jYDPxo21jbH0Q&s" alt="Reset Password" class="logo" />
          <h2 class="title">Password Reset Request</h2>
          <p class="message">We received a request to reset your password. If you didn’t make this request, please ignore this email.</p>
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="http://localhost:5173/change_password?verf_code=${validCode}" class="button" style="color:white">Reset My Password</a>
          </div>
          <div style="border-top: 1px solid #e5e7eb; padding-top: 10px;">
            <p class="footer">If you have any questions, feel free to contact our support team.</p>
            <p class="footer small-text">© 2024 Bagong Barrio Senior High School. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password assistance email sent successfully.");
  } catch (error) {
    console.log("Error occurred:", error);
    throw new Error("Email sending failed.");
  }
}

exports.HandlePasswordPost = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Step 1: Verify if email exists in the UserModel
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("Email not found.");
    }

    // Step 2: Generate OTP and expiration times
    const validCode = generateOTP();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 15 * 60 * 1000); // OTP valid for 15 minutes

    // Step 3: Insert OTP data into the OTPModel table
    await OTPModel.create({
      valid_code: validCode,
      mail_phone_number: email,
      createdAt,
      expiresAt,
    });

    // Step 4: Send email with verification link
    await mailOTP(email, validCode);

    res.status(200).send("Password reset email sent successfully.");
  } catch (err) {
    console.error("An error occurred while handling the password reset:", err);
    res.status(500).send("An error occurred while processing your request.");
    next(err);
  }
};




exports.HandlePasswordChangePost = async (req, res, next) => {
  try {
    const { otpCode, changePassword } = req.body;

    // Step 1: Search for OTP in database
    const otpEntry = await OTPModel.findOne({
      where: { valid_code: otpCode }
    });
    
    if (!otpEntry) {
      return res.status(404).json({ message: "Invalid OTP code" });
    }

    // Check OTP expiration
    if (moment().isAfter(moment(otpEntry.expiresAt))) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Step 2: Get email/phone from OTP and search user
    const { mail_phone_number } = otpEntry;
    const user = await UserModel.findOne({
      where: { email: mail_phone_number }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 3: Update the user's password
    user.password = changePassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });

  } catch (err) {
    console.error("Error in password change:", err);
    return res.status(500).json({ message: "Server error" });
  }
};