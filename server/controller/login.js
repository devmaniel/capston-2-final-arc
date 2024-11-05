const { Session } = require("express-session-sequelize")(
  require("express-session").Store
);

const connection = require("../database/connection.js");
const ViolationsModel = require("../model/violations.js")


const { QueryTypes } = require("sequelize");

exports.FindSession = async (req, res, next) => {
  try {
    console.log("Incoming Request Body:", req.body);
    const { sessionId, role } = req.body;
    if (!sessionId || !role) {
      console.log("Error: Session ID or role is missing.");
      return res.status(400).json({
        valid: false,
        reason: 'missing_params',
        message: "Session ID and role are required."
      });
    }

    const session = await connection.query(
      "SELECT * FROM `sessions` WHERE `session_id` = :sessionId",
      {
        replacements: { sessionId },
        type: QueryTypes.SELECT,
      }
    );

    if (session.length === 0) {
      return res.status(401).json({
        valid: false,
        reason: 'invalid_session',
        message: "Invalid session."
      });
    }

    const sessionData = JSON.parse(session[0].data);

    if (sessionData.expires_at < Date.now()) {
      return res.status(401).json({
        valid: false,
        reason: 'expired_session',
        message: "Session has expired."
      });
    }

    if (sessionData.user.role !== role) {
      return res.status(403).json({
        valid: false,
        reason: 'role_mismatch',
        message: "Role mismatch.",
        role: sessionData.user.role
      });
    }

    // Check for pending violations
    const pendingViolations = await ViolationsModel.findAll({
      where: {
        user_id: sessionData.user.id,
        status: "pending"
      }
    });

    if (pendingViolations.length > 0) {
      return res.status(403).json({
        valid: false,
        reason: 'pending_violations',
        message: "User has pending violations."
      });
    }

    return res.status(200).json({
      valid: true,
      role: sessionData.user.role
    });

  } catch (error) {
    console.error("Error finding session:", error);
    res.status(500).json({
      valid: false,
      reason: 'server_error',
      message: "Internal Server Error"
    });
  }
};