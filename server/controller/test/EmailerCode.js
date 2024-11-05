const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { google } = require("googleapis");
const config = require("../../api/GoogleOAUTH");

// OTP Model
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
const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

function generateOTP() {
  return randomstring.generate({ length: 6, charset: "numeric" });
}

function mailOTP(email, otp) {
  const mailOptions = {
    from: "devmaniel@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otp}`,
  };

  const accessToken = OAuth2_client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "devmaniel@gmail.com",
      clientId: config.clientId,
      clientSecret: config.clietSecret,
      refreshToken: config.refreshToken,
      accessToken: accessToken.token,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error);
    } else {
      console.log("OTP Email sent successfully:", info.response);
    }
  });
}

exports.sendOTP = async (req, res, next) => {
  const { email,lastName, firstName, phoneNumber, password, middleName } = req.body;
  
  console.log(email,lastName, firstName, phoneNumber, password, middleName);


  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);

  try {
    await OTPModel.create({
      valid_code: otp,
      mail_phone_number: email,
      expiresAt: expiresAt,
    });

    mailOTP(email, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("Error saving OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  console.log("Received email:", email);
  console.log("Received OTP:", otp);

  try {
    // Find the latest OTP entry for the given email
    const latestOTP = await OTPModel.findOne({
      where: { mail_phone_number: email },
      order: [["createdAt", "DESC"]],
    });

    if (!latestOTP) {
      console.log("Email not found");
      return res.sendStatus(404); // Email not found
    }

    if (Date.now() > new Date(latestOTP.expiresAt).getTime()) {
      console.log("OTP expired");
      return res.sendStatus(404); // OTP expired
    }

    if (latestOTP.valid_code === otp.trim()) {
      console.log("OTP verified successfully");
      return res.sendStatus(200); // OTP verified successfully
    } else {
      console.log("Invalid OTP");
      return res.sendStatus(404); // Invalid OTP
    }
  } catch (error) {
    console.log("Error verifying OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

exports.TestEmailer = (req, res, next) => {
  res.send(`
       <form action="/post-otp" method="POST">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <button type="submit">Submit</button>
       </form>

      <form action="/verify-otp" method="POST">
          <input type="email" id="verifyEmail" name="email" required />
          <label for="otp">Enter OTP:</label>
          <input type="text" id="otp" name="otp" required />
          <button type="submit">Verify OTP</button>
      </form>

    `);
};
