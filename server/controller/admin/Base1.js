// controller/admin/Base1.js
const BookData = require("../../database/data/BookData");
const RequestData = require("../../database/data/RequestData");
const ViolationsData = require("../../database/data/ViolatedAcc");
const ActiveAccount = require("../../database/data/ActiveData");
const ActivityLog = require("../../database/data/ActivityLog");
const TotalBooks = require("../../database/data/BookCreated");
const activityLog = require("../../database/data/ActivityLog");

const BookModel = require("../../model/Books");
const RequestModel = require("../../model/request");
const UserModel = require("../../model/user");
const ViolationsModel = require("../../model/violations");

const { Op } = require("sequelize"); // Import Op from Sequelize

exports.GetTotalBook = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_book");

    // Sum up the quantity field from all books
    const totalBooks = await BookModel.count();

    // Convert to string or use json with plain number
    res.status(200).send(totalBooks.toString());
    // Alternative: res.status(200).json(totalBooks);
  } catch (error) {
    console.error("Error in TotalBook:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getTotalActive = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_book");

    // Count the total quantity of all rows in the Books table
    const totalActiveRequest = await RequestModel.count();

    console.log("Total active request:", totalActiveRequest);

    // Send the total active count in the response
    res.status(200).json(totalActiveRequest); // Adjusting to send just the totalActive
  } catch (error) {
    console.error("Error in Total Active Request:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getTotalViolated = async (req, res, next) => {
  console.log("Testing connection to /admin/analytics/total_active_account");

  // Count the total quantity of all rows in the Books table
  const TotalActiveAccount = await UserModel.count();

  res.status(200).json(TotalActiveAccount);
};

exports.getActiveAcc = async (req, res, next) => {
  console.log("Testing connection to /admin/analytics/total_active_violations");

  // Count the total quantity of all rows in the Books table
  const TotalActiveViolations = await ViolationsModel.count();


  res.status(200).json(TotalActiveViolations);
};

exports.getActivityLog = (req, res, next) => {
  res.status(200).json(activityLog);
};

exports.totalBooksChart = (req, res, next) => {
  // Send the data array as JSON response
  res.status(200).json(TotalBooks);
};
