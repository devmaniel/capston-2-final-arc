
const BooksModel = require("../../model/Books");
const { Sequelize, Op } = require('sequelize');
const RequestModel = require("../../model/Bookmark");
const connection = require("../../database/connection.js")
const { QueryTypes } = require("sequelize");

exports.fetchBookmark = async (req, res, next) => {
  try {
    const { sessionId } = req.body;

    console.log("Fetch Bookmark Received Data: ", req.body);

    // Step 1: Check if sessionId is provided
    if (!sessionId) {
      console.log("Action: Session ID not provided, sending status 400");
      return res.status(400).json({
        message: "Session ID is required.",
      });
    }

    // Step 2: Find the session to retrieve user data
    const session = await connection.query(
      "SELECT * FROM `sessions` WHERE `session_id` = :sessionId",
      {
        replacements: { sessionId },
        type: QueryTypes.SELECT,
      }
    );

    if (session.length === 0) {
      console.log("Action: Invalid session, sending status 401");
      return res.status(401).json({
        message: "Invalid session.",
      });
    }

    // Step 3: Extract user ID from session data
    const sessionData = JSON.parse(session[0].data);
    const user_id = sessionData.user.id;

    // Step 4: Fetch all bookmarks for the user
    const bookmarks = await BookmarkModel.findAll({
      where: { user_id },
      attributes: ['book_id'], // Only retrieve the book_id field
    });

    if (bookmarks.length === 0) {
      console.log("Action: No bookmarks found, sending status 404");
      return res.status(404).json({
        message: "No bookmarks found.",
      });
    }

    // Step 5: Extract book IDs from the bookmarks
    const bookIds = bookmarks.map(bookmark => bookmark.book_id);

    // Step 6: Fetch detailed information for the bookmarked books
    const books = await BooksModel.findAll({
      where: {
        id: { [Op.in]: bookIds }, // Find books with matching book_ids
      },
      attributes: [
        'id', 
        'book_name', 
        'book_author', 
        'classifications_name', 
        'quantity', 
        'description', 
        'book_img_file', 
        'book_img_qr', 
        'isbn_code'
      ], // Include relevant book fields
    });

    if (books.length === 0) {
      console.log("Action: No bookmarked books found, sending status 404");
      return res.status(404).json({
        message: "No bookmarked books found.",
      });
    }

    // Step 7: Return the list of books
    console.log("Action: Bookmarks fetched successfully, sending status 200");
    return res.status(200).json({
      message: "Bookmarks fetched successfully",
      bookmarks: books, // List of book details
    });

  } catch (error) {
    console.error("Error in fetchBookmark:", error);
    console.log("Action: Server error, sending status 500");
    return res.status(500).json({
      message: "Server error",
    });
  }
};