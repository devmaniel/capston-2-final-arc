const ClassModel = require("../../model/classifications");

const { classifications } = require('../../database/data/Classifications');

exports.fetchAllClass = async (req, res, next) => {
  try {
    // Respond with the formatted data
    res.status(200).send(classifications);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
