const BookModel = require("../../../model/Books");
const RequestModel = require("../../../model/request");
const UserModel = require("../../../model/user");
const ViolationsModel = require("../../../model/violations");

const { Op } = require("sequelize"); // Import Op from Sequelize

// add this

exports.TotalBook = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_book");

    // Count the total quantity of all rows in the Books table
    const totalBooks = await BookModel.count();

    // Send the total count in the response
    res.status(200).json({ totalBooks });
  } catch (error) {
    console.error("Error in TotalBook:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalRequest = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_book");

    // Count the total quantity of all rows in the Books table
    const totalActiveRequest = await RequestModel.count();

    // Send the total count in the response
    res.status(200).json({ totalActiveRequest });
  } catch (error) {
    console.error("Error in Total Active Request:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalActiveAccount = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_active_account");

    // Count the total quantity of all rows in the Books table
    const TotalActiveAccount = await UserModel.count();

    // Send the total count in the response
    res.status(200).json({ TotalActiveAccount });
  } catch (error) {
    console.error("Error in Total Active Active:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalActiveViolations = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_active_violations");

    // Count the total quantity of all rows in the Books table
    const TotalActiveViolations = await ViolationsModel.count();

    // Send the total count in the response
    res.status(200).json({ TotalActiveViolations });
  } catch (error) {
    console.error("Error in Total Active Violation:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalBookActive = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_book_active");

    // Sum the quantity field for all rows in the Books table
    const totalQuantity = await BookModel.sum("quantity");

    // Send the total quantity in the response
    res.status(200).json( totalQuantity );
  } catch (error) {
    console.error("Error in TotalBookActive:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalOutOfStock = async (req, res, next) => {
  try {
    console.log("Testing connection to /admin/analytics/total_out_of_stock");

    console.log("Counting books with quantity below 1 or negative");

    // Count rows where quantity is less than 1
    const outOfStockCount = await BookModel.count({
      where: {
        quantity: { [Op.lt]: 1 }, // less than 1 (either 0 or negative)
      },
    });

    console.log("Counting books with quantity below 1 or negative:", outOfStockCount );

    // Send the count in the response
    res.status(200).json( outOfStockCount );
  } catch (error) {
    console.error("Error in TotalOutOfStock:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.TotalBorrowedBook = async (req, res, next) => {
  try {
    console.log("Counting requests with status 'borrowed'");

    // Count rows where status is "borrowed"
    const borrowedCount = await RequestModel.count({
      where: {
        status: "borrowed",
      },
    });

    // Send the count in the response
    res.status(200).json( borrowedCount );
  } catch (err) {
    console.error("Error in TotalBorrowedBook:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};
