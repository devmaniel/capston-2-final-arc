const UserModel = require("../../model/user");
const NotificationsModel = require("../../model/Notifications");

const connections = require("../../database/connection");

const { QueryTypes } = require("sequelize");

exports.fetchNotifications = async (req, res, next) => {
  try {
    console.log("Starting fetchNotifications process.");

    const { sessionId } = req.body;
    console.log("Extracted sessionId from request body:", sessionId);

    if (!sessionId) {
      console.log("Error: Session ID is missing.");
      return res.status(400).json({
        valid: false,
        reason: "missing_params",
        message: "Session ID is required.",
      });
    }

    console.log("Querying session data using sessionId...");
    const session = await connections.query(
      "SELECT * FROM `sessions` WHERE `session_id` = :sessionId",
      {
        replacements: { sessionId },
        type: QueryTypes.SELECT,
      }
    );

    console.log("Session query result:", session);

    if (session.length === 0) {
      console.log("Error: Session not found.");
      return res.status(401).json({
        valid: false,
        reason: "invalid_session",
        message: "Invalid session.",
      });
    }

    const sessionData = JSON.parse(session[0].data);
    const userId = sessionData.user.id;
    console.log("Extracted userId from session data:", userId);

    console.log("Fetching notifications for userId:", userId);
    const notifications = await NotificationsModel.findAll({
      where: { account_id: userId },
      attributes: ['account_id', 'descriptions', 'href', 'type', 'isRead', "createdAt"],
    });

    console.log("Notifications query result:", notifications);

    if (!notifications || notifications.length === 0) {
      console.log("No notifications found for this user.");
      return res.status(200).json({
        valid: true,
        data: [],
        counter: 0, // Ensures the client receives an empty array and counter 0
      });
    }

    console.log("Returning fetched notifications.");
    return res.status(200).json({
      valid: true,
      data: notifications,
      counter: notifications.length,
    });

  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({
      valid: false,
      reason: "server_error",
      message: "Internal Server Error",
    });
  }
};
