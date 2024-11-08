const RequestModel = require("../../model/request.js");
const BookModel = require("../../model/Books");
const BookmarkModel = require("../../model/Bookmark");
const UserModel = require("../../model/user");
const ViolationsModel = require("../../model/violations.js");
const { Op } = require("sequelize"); // Import Op for query operations

const { Sequelize } = require("sequelize");
const connection = require("../../database/connection.js");
const { QueryTypes } = require("sequelize");

// Function to generate a random 7-character request code
const generateRequestCode = () => {
  return Math.random().toString(36).substring(2, 9).toUpperCase();
};



exports.PostSingleRequest = async (req, res, next) => {
  try {
    console.log("Received data:", req.body);

    // Step 1: Get data from the request body
    const { book_id, quantity, comment, pickupDate, returnDate, sessionId } =
      req.body;
    console.log("Book ID:", book_id);
    console.log("Quantity:", quantity);
    console.log("Comment:", comment);
    console.log("Pickup Date:", pickupDate);
    console.log("Return Date:", returnDate);

    // Step 2: Find the session in the database
    const sessions = await connection.query(
      "SELECT * FROM sessions WHERE session_id = :sessionId",
      {
        replacements: { sessionId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // Step 3: If a matching session is found, parse its data
    if (sessions.length > 0) {
      const sessionData = JSON.parse(sessions[0].data);
      console.log("Session data:", sessionData);

      // Step 4: Look for the userId in the sessionData
      const userId = sessionData.user.id;
      console.log("User ID:", userId);

      // Step 5: Check if the book exists in the BooksModel
      const book = await BookModel.findOne({ where: { id: book_id } });

      if (book) {
        // Generate a 7-character request code
        const requestCode = generateRequestCode();

        // Step 6: Create a new request entry in the RequestModel
        await RequestModel.create({
          book_qty: quantity,
          request_code: requestCode,
          user_id: userId,
          book_id: book_id,
          status: "pending",
          request_qr_img: "pending", // Placeholder for QR image
          student_comment: comment,
          admin_comment: null, // Placeholder for admin comment
          pickupdate: pickupDate, // Insert pickupDate
          returndate: returnDate, // Insert returnDate
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        // Step 7: Send a success response
        res.status(201).send({ message: "Request was successfully created" });
      } else {
        // If no matching book is found
        console.log("Book not found");
        res.status(404).send({ error: "Book not found" });
      }
    } else {
      // If no matching session is found
      console.log("No matching session found");
      res.status(404).send({ error: "Session not found" });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send({ error: "Server error" });
  }
};

exports.postBookmarkRequest = async (req, res, next) => {
  try {
    console.log("Received bookmark request data:", req.body);

    const { sessionId, pickupDate, comment, bookmarkedBooks, returnDate } =
      req.body;

    // Step 1: Validate sessionId
    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    // Step 2: Find the session in the database to extract user information
    const session = await connection.query(
      "SELECT * FROM `sessions` WHERE `session_id` = :sessionId",
      {
        replacements: { sessionId },
        type: QueryTypes.SELECT,
      }
    );

    if (session.length === 0) {
      console.log("Error: Session not found.");
      return res.status(401).json({ message: "Invalid session" });
    }

    const sessionData = JSON.parse(session[0].data); // Parse the session data
    const userId = sessionData.user.id; // Extract the userId from session
    console.log("User ID from Session:", userId);

    // Step 3: Get the list of `book_id` values from the client data
    const bookIds = bookmarkedBooks.map(({ book_id }) => book_id);

    // Step 4: Check if any requests for these books already exist for the current user
    const existingRequests = await RequestModel.findAll({
      where: {
        user_id: userId,
        status: { [Op.in]: ["pending", "borrowed", "accepted"] }, // Check only for active statuses
      },
      attributes: ["book_id"],
    });

    // Count active requests
    const activeRequestCount = existingRequests.length;

    // Check if the user has reached the request limit
    if (activeRequestCount >= 3) {
      return res
        .status(400)
        .json({ message: "You've reached your request limit." });
    }

    // Check for duplicates
    const duplicateRequests = await RequestModel.findAll({
      where: {
        user_id: userId,
        book_id: { [Op.in]: bookIds },
      },
      attributes: ["book_id"],
    });

    if (duplicateRequests.length > 0) {
      const duplicateBookIds = duplicateRequests.map(
        (request) => request.book_id
      );
      const duplicateBooks = await BookModel.findAll({
        where: { id: duplicateBookIds },
        attributes: ["book_name"],
      });

      const duplicateBookNames = duplicateBooks
        .map((book) => book.book_name)
        .join(", ");
      return res.status(400).json({
        message: "Duplicate requests found.",
        alreadyRequestedBooks: duplicateBookNames,
      });
    }

    // Step 6: Create requests if there are no duplicate requests
    const requestCode = generateRequestCode();
    const requestPromises = bookmarkedBooks.map(({ book_id }) => {
      return RequestModel.create({
        book_qty: 1,
        request_code: requestCode,
        user_id: userId,
        book_id: book_id,
        status: "pending",
        request_qr_img: "pending",
        student_comment: comment,
        admin_comment: null,
        pickupdate: pickupDate,
        returndate: returnDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await Promise.all(requestPromises);

    // Step 8: Remove the bookmarks from the `BookmarkModel`
    const bookmarkIds = bookmarkedBooks.map(
      ({ isBookmarked_id }) => isBookmarked_id
    );
    await BookmarkModel.destroy({
      where: {
        id: bookmarkIds,
      },
    });

    // Step 9: Update the `BookModel`
    await BookModel.update({ isBookmarked: false }, { where: { id: bookIds } });

    // Step 10: Send success response to the client
    res
      .status(200)
      .json({
        message: "Bookmark requests created and bookmarks removed successfully",
      });
  } catch (error) {
    console.error("Error processing bookmark request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchPostRequestHistory = async (req, res, next) => {
  try {
    // Step 1: Retrieve the sessionId, statusFilter, statusDate, and searchBar from the request body
    const {
      sessionId,
      statusFilter = "all",
      statusDate = "newest",
      searchBar = "",
    } = req.body;

    console.log("Received Data", req.body);
    console.log("Received sessionId:", sessionId);

    // Step 2: Find the session in the database
    const sessions = await connection.query(
      "SELECT * FROM sessions WHERE session_id = :sessionId",
      {
        replacements: { sessionId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (sessions.length > 0) {
      const sessionData = JSON.parse(sessions[0].data);
      const userId = sessionData.user.id;

      console.log("User ID:", userId);

      // Step 3: Build status filter query
      let statusCondition = "";
      if (statusFilter.toLowerCase() !== "all") {
        statusCondition = `AND LOWER(requests.status) = :statusFilter`; // Filter by status
      }

      // Step 4: Build sorting query based on statusDate
      let sortCondition = "";
      switch (statusDate.toLowerCase()) {
        case "newest":
          sortCondition = "ORDER BY requests.createdAt DESC"; // Newest to oldest
          break;
        case "oldest":
          sortCondition = "ORDER BY requests.createdAt ASC"; // Oldest to newest
          break;
        case "a-z":
          sortCondition = "ORDER BY requests.request_code ASC"; // Sort by request_code (A-Z)
          break;
        case "z-a":
          sortCondition = "ORDER BY requests.request_code DESC"; // Sort by request_code (Z-A)
          break;
        default:
          sortCondition = "ORDER BY requests.createdAt DESC"; // Default: newest to oldest
          break;
      }

      // Step 5: Build search query for request_code, book_name, and book_author
      let searchCondition = "";
      if (searchBar.trim()) {
        searchCondition = `AND (
          LOWER(requests.request_code) LIKE :searchBar OR
          LOWER(books.book_name) LIKE :searchBar OR
          LOWER(books.book_author) LIKE :searchBar
        )`;
      }

      // Step 6: Fetch user information
      const user = await connection.query(
        "SELECT last_name, first_name, email, id FROM users WHERE id = :userId",
        {
          replacements: { userId },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      // Step 7: Fetch filtered and sorted requests for the user with the search functionality
      const requests = await connection.query(
        `SELECT requests.*, books.book_name, books.book_author 
         FROM requests 
         LEFT JOIN books ON requests.book_id = books.id 
         WHERE requests.user_id = :userId 
         ${statusCondition} 
         ${searchCondition} 
         ${sortCondition}`,
        {
          replacements: {
            userId,
            statusFilter: statusFilter.toLowerCase(),
            searchBar: `%${searchBar.toLowerCase()}%`,
          },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

     

      // Step 8: Fetch books associated with each request
      const requestDetails = await Promise.all(
        requests.map(async (request) => {
          const books = await connection.query(
            "SELECT book_name, book_author, book_img_qr FROM books WHERE id = :bookId",
            {
              replacements: { bookId: request.book_id },
              type: Sequelize.QueryTypes.SELECT,
            }
          );

          const book =
            books.length > 0
              ? books[0]
              : { book_name: null, book_author: null, book_img_qr: null };

          return {
            ...request,
            book_name: book.book_name,
            book_author: book.book_author,
            book_img_qr: book.book_img_qr,
          };
        })
      );

      // Step 9: Form the final response
      const responseData = {
        user: user[0], // Assuming user exists
        requests: requestDetails,
      };

      // Step 10: Send the result back to the client
      res.status(200).json({
        message: "Request history fetched successfully",
        data: responseData,
      });
    } else {
      // Session not found
      console.error("Session not found");
      res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    console.error("Error in fetching request history:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.postCancelRequest = async (req, res, next) => {
  try {
    const { request_id } = req.body; // Extract request_id from req.body

    // Find the request by ID
    const request = await RequestModel.findOne({ where: { id: request_id } });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update the request status to "cancelled"
    request.status = "cancelled";
    await request.save();

    // Respond with success
    res
      .status(200)
      .json({ message: "Request cancelled successfully", request });
  } catch (error) {
    console.error("Error cancelling request:", error);
    res.status(500).json({ message: "Server error" });
  }
};




exports.QRviewSingleRequest = async (req, res, next) => {
  try {
    const { sessionId, request_id } = req.body;

    console.log(`Session ID: ${sessionId} and Request ID: ${request_id}`);

    // Step 1: Find the session in the database
    const sessions = await connection.query(
      "SELECT * FROM sessions WHERE session_id = :sessionId",
      {
        replacements: { sessionId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (sessions.length === 0) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Step 2: Parse session data and extract userId
    const sessionData = JSON.parse(sessions[0].data);
    const userId = sessionData.user.id;

    // Step 3: Find user data from UserModel using userId
    const user = await UserModel.findOne({
      where: { id: userId },
      attributes: [
        "last_name",
        "first_name",
        "middle_name",
        "phone_number",
        "acc_lrn",
        "email",
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 4: Find request details and check/update violation status
    let request = await RequestModel.findOne({
      where: { id: request_id },
      attributes: [
        "id",
        "request_code",
        "book_id",
        "student_comment",
        "authorizer",
        "status",
        "admin_comment",
        "pickupdate",
        "returndate",
        "user_id"
      ],
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

  
    // Step 6: Find book details from BookModel using book_id
    const book = await BookModel.findOne({
      where: { id: request.book_id },
      attributes: [
        "book_name",
        "book_author",
        "book_img_file",
        "classifications_name",
      ],
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Combine and send response data with potentially updated status
    return res.status(200).json({
      user: {
        last_name: user.last_name,
        first_name: user.first_name,
        middle_name: user.middle_name,
        phone_number: user.phone_number,
        acc_lrn: user.acc_lrn,
        email: user.email,
      },
      request: {
        request_code: request.request_code,
        student_comment: request.student_comment,
        admin_comment: request.admin_comment,
        authorizer: request.authorizer,
        pickupdate: request.pickupdate,
        returndate: request.returndate,
        status: request.status,
      },
      book: {
        book_name: book.book_name,
        book_author: book.book_author,
        book_img_file: book.book_img_file,
        classifications: book.classifications_name,
      },
    });
  } catch (error) {
    console.error("Error in QRviewSingleRequest:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};