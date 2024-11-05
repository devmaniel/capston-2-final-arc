const UserModel = require("../../model/user.js");
const LRNModel = require("../../model/lrn.js");
const { QueryTypes, Op } = require("sequelize"); // Add Op here

const connection = require("../../database/connection.js");

exports.fetchProfileInfo = async (req, res, next) => {
  try {
    console.log("Incoming Request Body Profile:", req.body);
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required.",
      });
    }

    // Step 1: Fetch the session data to get the user ID
    const session = await connection.query(
      "SELECT * FROM `sessions` WHERE `session_id` = :sessionId",
      {
        replacements: { sessionId },
        type: QueryTypes.SELECT,
      }
    );
    console.log("Step 1 - Session data:", session);

    if (session.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Session not found or invalid.",
      });
    }

    const sessionData = JSON.parse(session[0].data);
    console.log("Step 1 - Parsed session data:", sessionData);

    // Step 2: Extract the user ID from the session data
    const userId = sessionData.user.id;
    console.log("Step 2 - Extracted user ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid session data, user ID not found.",
      });
    }

    // Step 3: Fetch user profile from `users` table using the user ID
    const userProfile = await UserModel.findOne({
      where: { id: userId },
      attributes: [
        "id",
        "last_name",
        "first_name",
        "middle_name",
        "email",
        "phone_number",
        "acc_lrn",
        "profileImage",
      ],
    });
    console.log("Step 3 - User profile:", userProfile);

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found.",
      });
    }

    // Step 4: Fetch LRN details using `acc_lrn` from the user profile
    const lrnAccount = await LRNModel.findOne({
      where: { valid_lrn: userProfile.acc_lrn },
      attributes: [
        "id",
        "last_name",
        "first_name",
        "middle_name",
        "valid_lrn",
        "section",
        "track",
        "year_level",
        "status_lrn",
        "role",
      ],
    });
    console.log("Step 4 - LRN account:", lrnAccount);

    if (!lrnAccount) {
      return res.status(404).json({
        success: false,
        message: "LRN account not found.",
      });
    }

    // Combine the data from both tables
    const profileInfo = {
      lastName: userProfile.last_name,
      firstName: userProfile.first_name,
      middleName: userProfile.middle_name || "",
      email: userProfile.email,
      LRN: lrnAccount.valid_lrn,
      contactNumber: userProfile.phone_number,
      accLRN: userProfile.acc_lrn,
      section: lrnAccount.section,
      track: lrnAccount.track,
      yearLevel: lrnAccount.year_level,
      statusLRN: lrnAccount.status_lrn,
      role: lrnAccount.role,
      profileImage: userProfile.profileImage || "",
    };
    console.log("Final profile info:", profileInfo);

    return res.status(200).json({
      data: profileInfo,
    });
  } catch (error) {
    console.error("Error fetching profile info:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.postChangePassword = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    const { lrn, current, newPass } = req.body;

    // Find the user by their LRN
    const user = await UserModel.findOne({ where: { acc_lrn: lrn } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password matches
    if (user.password !== current) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update the user's password
    user.password = newPass; // Ensure this is safe for storage!

    // Update the updatedAt field
    user.updatedAt = new Date();

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error handling password change:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.postUploadProfilePicture = async (req, res, next) => {
  try {
    const { LRN } = req.body;

    // Find the user by LRN
    const user = await UserModel.findOne({ where: { acc_lrn: LRN } });

    if (user) {
      // Save the uploaded image filename to the user profile
      user.profileImage = req.file.filename; // Assuming the model has a field `profileImage`
      await user.save();
      return res
        .status(200)
        .json({ message: "Profile picture uploaded successfully!" });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading profile picture." });
  }
};

exports.postChangeProfileInfo = async (req, res, next) => {};
