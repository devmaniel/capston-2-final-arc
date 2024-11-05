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


exports.getActivityLog = async (req, res, next) => {
  try {
    // Get the latest 5 books based on createdAt
    const books = await BookModel.findAll({
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order
      limit: 5, // Limit the results to 5
      attributes: ['book_name', 'createdAt'], // Only select book_name and createdAt
    });

    // Format the data as requested
    const activityLog = books.map((book) => ({
      Action: 'Book Added',
      BookName: book.book_name,
      Date: new Date(book.createdAt),
    }));

    // Send the formatted data as JSON
    res.status(200).json(activityLog);
  } catch (error) {
    console.error("Error fetching activity log:", error);
    res.status(500).json({ error: "An error occurred while fetching the activity log" });
  }
};

exports.totalBooksChart = async (req, res, next) => {
  try {
    // Get all books data
    const allBooks = await BookModel.findAll();

    // Initialize empty array for each month
    const data = Array.from({ length: 12 }, () => ({
      date: '',
      data: 0
    }));

    // Loop through all books and increment the corresponding month
    allBooks.forEach(book => {
      const month = new Date(book.createdAt).getMonth();
      data[month].date = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(book.createdAt));
      data[month].data++;
    });

    // Send the data array as JSON response
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};