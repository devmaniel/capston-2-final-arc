const { QueryTypes } = require("sequelize");
const connection = require("../database/connection.js");

exports.PostLogout = async (req, res, next) => {
  const { sessionId } = req.body;

  try {
    // Destroy the session in the database
    await connection.query(
      'DELETE FROM sessions WHERE session_id = :sessionId',
      {
        replacements: { sessionId },
        type: QueryTypes.DELETE
      }
    );

    // If you have other session management logic, apply it here
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};