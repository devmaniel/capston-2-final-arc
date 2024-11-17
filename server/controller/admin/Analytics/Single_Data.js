const BookModel = require("../../../model/Books");
const RequestModel = require("../../../model/request");
const UserModel = require("../../../model/user");
const ViolationsModel = require("../../../model/violations");

const { Op } = require("sequelize"); // Import Op from Sequelize

const getDateRange = (dateFilter) => {
  const now = new Date();
  let startDate, endDate;

  switch (dateFilter) {
      case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
          endDate = new Date(now.setHours(23, 59, 59, 999)); // End of today
          break;
      case "this_week":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - now.getDay()); // Start of this week (Sunday)
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date(now);
          endDate.setHours(23, 59, 59, 999); // End of today
          break;
      case "last_week":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - now.getDay() - 7); // Start of last week
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date(now);
          endDate.setDate(now.getDate() - now.getDay() - 1); // End of last week (Saturday)
          endDate.setHours(23, 59, 59, 999);
          break;
      case "last_month":
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1); // Start of last month
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date(now.getFullYear(), now.getMonth(), 0); // End of last month
          endDate.setHours(23, 59, 59, 999);
          break;
      case "last_6_months":
          startDate = new Date(now);
          startDate.setMonth(now.getMonth() - 6); // 6 months ago
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date(now); // Today
          endDate.setHours(23, 59, 59, 999);
          break;
      case "one_year_ago":
          startDate = new Date(now);
          startDate.setFullYear(now.getFullYear() - 1); // 1 year ago
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date(now); // Today
          endDate.setHours(23, 59, 59, 999);
          break;
      case "all":
          return null; // No date range filter for "all"
      default:
          return null; // No date range filter
  }
  return { startDate, endDate };
};

exports.TotalBook = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_book");

    // Step 1: Determine the date range based on the `date` query
    const dateRange = getDateRange(req.query.date);

    // Step 2: Construct the where clause based on the date range
    const whereClause = dateRange
      ? { createdAt: { [Op.between]: [dateRange.startDate, dateRange.endDate] } }
      : {}; // If no date range, fetch all data

    // Step 3: Count the total quantity of rows in the Books table filtered by date range
    const totalBooks = await BookModel.count({ where: whereClause });

    // Step 4: Send the total count in the response
    res.status(200).json( totalBooks );
  } catch (error) {
    console.error("Error in TotalBook:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalRequest = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_request");

    // Step 1: Determine the date range based on the `date` query
    const dateRange = getDateRange(req.query.date);

    // Step 2: Construct the where clause based on the date range
    const whereClause = dateRange
      ? { createdAt: { [Op.between]: [dateRange.startDate, dateRange.endDate] } }
      : {}; // If no date range, fetch all data

    // Step 3: Count the total requests filtered by date range
    const totalActiveRequest = await RequestModel.count({ where: whereClause });

    // Step 4: Send the total count in the response
    res.status(200).json( totalActiveRequest );
  } catch (error) {
    console.error("Error in Total Active Request:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalActiveAccount = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_active_account");

    // Step 1: Determine the date range based on the `date` query
    const dateRange = getDateRange(req.query.date);

    // Step 2: Construct the where clause based on the date range
    const whereClause = dateRange
      ? { createdAt: { [Op.between]: [dateRange.startDate, dateRange.endDate] } }
      : {}; // If no date range, fetch all data

    // Step 3: Count the total active accounts filtered by date range
    const totalActiveAccount = await UserModel.count({ where: whereClause });

    // Step 4: Send the total count in the response
    res.status(200).json( totalActiveAccount );
  } catch (error) {
    console.error("Error in Total Active Account:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalActiveViolations = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_active_violations");

    // Step 1: Determine the date range based on the `date` query
    const dateRange = getDateRange(req.query.date);

    // Step 2: Construct the where clause based on the date range
    const whereClause = dateRange
      ? { createdAt: { [Op.between]: [dateRange.startDate, dateRange.endDate] } }
      : {}; // If no date range, fetch all data

    // Step 3: Count the total active violations filtered by date range
    const TotalActiveViolations = await ViolationsModel.count({ where: whereClause });

    // Step 4: Send the total count in the response
    res.status(200).json( TotalActiveViolations );
  } catch (error) {
    console.error("Error in Total Active Violation:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalBookActive = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_book_active");

    // Step 1: Determine the date range based on the `date` query
    const dateRange = getDateRange(req.query.date);

    // Step 2: Construct the where clause based on the date range
    const whereClause = dateRange
      ? { createdAt: { [Op.between]: [dateRange.startDate, dateRange.endDate] } }
      : {}; // If no date range, fetch all data

    // Step 3: Sum the quantity field filtered by date range
    const totalQuantity = await BookModel.sum("quantity", { where: whereClause });

    // Step 4: Send the total quantity in the response
    res.status(200).json( totalQuantity );
  } catch (error) {
    console.error("Error in TotalBookActive:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalOutOfStock = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_out_of_stock");

    // Step 1: Determine the date range based on the `date` query
    const dateRange = getDateRange(req.query.date);

    // Step 2: Construct the where clause based on the date range and quantity filter
    const whereClause = {
      quantity: { [Op.lt]: 1 }, // Less than 1 (either 0 or negative)
      ...(dateRange && { createdAt: { [Op.between]: [dateRange.startDate, dateRange.endDate] } }),
    };

    console.log("Counting books with quantity below 1 or negative with date range:", whereClause);

    // Step 3: Count rows that are out of stock filtered by date range
    const outOfStockCount = await BookModel.count({ where: whereClause });

    console.log("Total out-of-stock books:", outOfStockCount);

    // Step 4: Send the count in the response
    res.status(200).json( outOfStockCount );
  } catch (error) {
    console.error("Error in TotalOutOfStock:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};


exports.TotalBorrowedBook = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_borrowed_book");

    // Step 1: Determine the date range based on the `date` query
    const dateRange = getDateRange(req.query.date);

    // Step 2: Construct the where clause based on the date range and status
    const whereClause = {
      status: "borrowed", // Only requests with status "borrowed"
      ...(dateRange && { createdAt: { [Op.between]: [dateRange.startDate, dateRange.endDate] } }),
    };

    console.log("Counting borrowed requests with date range:", whereClause);

    // Step 3: Count rows that match the status and date range
    const borrowedCount = await RequestModel.count({ where: whereClause });

    console.log("Total borrowed books count:", borrowedCount);

    // Step 4: Send the count in the response
    res.status(200).json( borrowedCount );
  } catch (err) {
    console.error("Error in TotalBorrowedBook:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};