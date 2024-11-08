const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { google } = require("googleapis");
const config = require("../../api/GoogleOAUTH");

const twilio = require("twilio");
const accountSid = "AC45e6cf65f4b9062145d0d8be4df09726";
const authToken = "7e6cc037a67e85681bb3bf60fb21de0f";

const client = twilio(accountSid, authToken);

const bcrypt = require('bcrypt'); // Import bcrypt

// model
const LRNModel = require("../../model/lrn");
const USERModel = require("../../model/user");
const OTPModel = require("../../model/OTP");

// Initialize OAuth2 client
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(
  config.clientId,
  config.clietSecret,
  "https://developers.google.com/oauthplayground"
);
OAuth2_client.setCredentials({ refresh_token: config.refreshToken });

// In-memory storage for OTPs and their expiration times
const otpCache = {};
const OTP_EXPIRATION_TIME = 4 * 60 * 1000; // 1 minute

function generateOTP() {
  return randomstring.generate({ length: 6, charset: "numeric" });
}

function mailOTP(email, otp, firstName, lastName) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "melcoschool@gmail.com",
      pass: "azck xesp zfgo wwtr ", // replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use an environment variable
    to: email,
    subject: "OTP Verification",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>OTP Verification</title>
        </head>
        <body style="font-family: 'Poppins', sans-serif; text-align: center; color: #47454A;">
          <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid gainsboro; border-radius: 10px;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUQ-gcLN9gTUlPjmgpRQiy2jYDPxo21jbH0Q&s" alt="Logo" style="height: 50px; margin-bottom: 20px; background-color:white; border-radius:50%" />
            <h2 style="font-weight: 500;">Here is your BBSHS OTP Code, ${firstName}</h2>
            <h4>Welcome, @${firstName}, ${lastName}</h4>
            <img src="https://img.freepik.com/premium-vector/enter-your-mail-2-step-verification-illustration-concept_108061-1258.jpg?w=740" alt="Congrats" style="width: 150px; height: 150px; object-fit: cover; margin: 20px 0; background-color:white; border-radius:50%" />
            <p style="margin-bottom: 20px;">Continue signing up for BBSHS Library by entering this One Time Password (OTP) Below:</p>
            <div style="background-color: gainsboro; padding: 10px; margin-bottom: 20px; border-radius: 5px; display: inline-block;">
              <p style="letter-spacing: 5px; font-size: 20px; font-weight: bold;">${otp}</p>
            </div>
            <p style="font-size: 12px; margin-top: 20px;">Once you complete the signup, you can now log in to BBSHS Library.</p>
            <p style="font-size: 12px;">Terms - Privacy - <a href="https://example.com" style="color: #1E3A8A;">Login to BBSHS Library</a></p>
          Your OTP for verification is: <b><u>${otp}</u></b>
            </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error);
    } else {
      console.log("OTP Email sent successfully:", info.response);
    }
  });
}

exports.PostLRNStep1 = async (req, res, next) => {
  try {
    const { lrn } = req.body;
    console.log("Received LRN:", lrn);

    // Check if the account exists
    const user = await USERModel.findOne({ where: { acc_lrn: lrn } });
    if (user) {
      return res.status(200).json({ errorState: "account-exist" });
    }

    // Check if the LRN exists in validLRN
    const validLRN = await LRNModel.findOne({ where: { valid_lrn: lrn } });
    if (!validLRN) {
      return res.status(200).json({ errorState: "invalid-input" });
    }

    // If we reach here, the LRN is valid and the account doesn't exist
    res.status(200).json({ errorState: null });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ errorState: "server-error" });
  }
};

exports.PostLRNStep2 = async (req, res, next) => {
  try {
    const { email, lastName, firstName, middleName, lrn } = req.body;

    console.log("Received data:", req.body);

    // Check if the email already exists in the UserModel
    const existingUser = await USERModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const queryCondition = {
      last_name: lastName,
      first_name: firstName,
      valid_lrn: lrn,
    };

    if (middleName) {
      queryCondition.middle_name = middleName;
    }

    const lrnRecord = await LRNModel.findOne({ where: queryCondition });

    if (lrnRecord) {
      // Generate OTP and store it in the database
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);

      const newOtpRecord = await OTPModel.create({
        valid_code: otp,
        mail_phone_number: email,
        expiresAt: expiresAt,
      });

      mailOTP(email, otp, firstName, lastName); // Send OTP to email
      console.log("OTP:", otp);

      // Respond with OTP ID to client
      res.status(202).json({
        valid_lrn: true,
        otp_id: newOtpRecord.id, // Send OTP ID
        message: "Proceed to OTP",
      });
    } else {
      res
        .status(202)
        .json({ valid_lrn: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in PostLRNStep2:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const axios = require('axios');



// Function to handle form submission
exports.PostLRNStep3 = async (req, res, next) => {
  const { email, otp, phoneNumber, mailOtpID } = req.body;

  // Log mailOtpID for debugging purposes
  console.log("Received mailOtpID:", mailOtpID);

  // Log email for debugging purposes
  console.log("Received email:", email);

  if (!mailOtpID) {
    console.log("mailOtpID not provided");
    return res
      .status(400)
      .json({ valid_otp: false, message: "mailOtpID is missing" });
  }

  try {
    // Find OTP record by mailOtpID (primary key)
    const otpRecord = await OTPModel.findOne({
      where: { id: mailOtpID },
    });

    if (!otpRecord) {
      console.log("mailOtpID not found");
      return res
        .status(404)
        .json({ valid_otp: false, message: "OTP record not found" });
    }

    // Ensure that the email matches
    if (otpRecord.mail_phone_number !== email) {
      console.log("Email does not match OTP record");
      return res
        .status(404)
        .json({ valid_otp: false, message: "Email does not match" });
    }

    // Check if the OTP has expired
    if (Date.now() > new Date(otpRecord.expiresAt).getTime()) {
      console.log("OTP expired");
      return res.status(401).json({ valid_otp: false, message: "OTP expired" });
    }

    // Validate the OTP
    if (otpRecord.valid_code === otp.trim()) {
      console.log("OTP verified successfully");

      const newOtp = generateOTP();
      const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);

      console.log("Phone OTP:", newOtp);

      // Format the phone number with +63 prefix
      const formattedPhoneNumber = `+63${phoneNumber}`;

      console.log("formatted phone number", formattedPhoneNumber)

      // Create a new OTP for phone number verification
      await OTPModel.create({
        valid_code: newOtp,
        mail_phone_number: formattedPhoneNumber,
        expiresAt: expiresAt,
      });

      // Try to send the new OTP via Twilio, but do not fail if it doesn't work
      try {
        const message = await client.messages.create({
          body: `Your BBSSHS account OTP code: ${newOtp}`,
          from: "+12312992156", // Twilio number
          to: formattedPhoneNumber,
        })
        .then(message => console.log(message.sid));

        console.log("New OTP sent to phone number:", formattedPhoneNumber);
        console.log("Twilio response:", message);
      } catch (twilioError) {
        console.error("Failed to send OTP via Twilio:", twilioError);
        // Continue without failing the request due to Twilio failure
      }

      return res.status(202).json({
        valid_otp: true,
        message: "OTP verified, new OTP generated and sent to phone number",
      });
    } else {
      console.log("Invalid OTP");
      return res.status(404).json({ valid_otp: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.log("Error verifying OTP or generating new OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP or generate new OTP" });
  }
};



exports.PostLRNStep4 = async (req, res, next) => {
  try {
    const { phoneNumber, otp, email, password, lrn } = req.body;

    console.log("Request body OTP:", otp);

    // Step 1: Validate OTP
    const otpEntry = await OTPModel.findOne({
      where: { valid_code: otp },
      order: [["createdAt", "DESC"]],
    });

    // Check if OTP exists
    if (!otpEntry) {
      console.log("OTP not found");
      return res.status(400).json({ valid_phone_otp: false });
    }

    // Check if OTP is expired
    if (new Date() >= otpEntry.expiresAt) {
      console.log("Expired OTP detected");
      return res.status(400).json({ valid_phone_otp: false });
    }

    // Check if OTP matches
    if (otpEntry.valid_code !== otp) {
      console.log("Invalid OTP detected");
      return res.status(400).json({ valid_phone_otp: false });
    }

    // Step 2: Retrieve LRN Data
    const lrnData = await LRNModel.findOne({
      where: { valid_lrn: lrn },
    });

    if (!lrnData) {
      return res.status(404).json({ error: "LRN not found" });
    }

    // Step 3: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Step 4: Insert Data into USERModel with hashed password
    const newUser = await USERModel.create({
      last_name: lrnData.last_name,
      first_name: lrnData.first_name,
      middle_name: lrnData.middle_name,
      acc_lrn: lrnData.valid_lrn, // Foreign Key
      email: email,
      phone_number: phoneNumber,
      password: hashedPassword, // Use hashed password
      status: "Active", // Set status to "Active"
      role: "Student", // Set role to "Student"
    });

    // Step 5: Update LRNModel to Link with USERModel
    await lrnData.update({
      acc_status: newUser.id, // Update acc_status with the new User ID
      status: "active",
    });

    // Step 6: Send Success Response
    return res
      .status(200)
      .json({ success: true, userId: newUser.id, valid_phone_otp: true });
  } catch (error) {
    console.error("Error during account creation:", error);

    // Differentiate between different error scenarios
    if (error.message.includes("server down")) {
      return res.status(404).json({ error: "Server is down" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};
