const BooksModel = require("../../model/Books");
const { QueryTypes, Op, Sequelize  } = require("sequelize"); // Add Op here
const BookmarkModel = require("../../model/Bookmark");
const connection = require("../../database/connection.js");
const UserModel = require("../../model/user.js");
const RequestModel = require("../../model/request.js")



exports.fetchSingleBook = async (req, res, next) => {
  console.log("Fetching single book - started");

  try {
    const { bookId, sessionId } = req.body;
    console.log(`Received bookId: ${bookId}`);
    console.log(`Received Session ID: ${sessionId}`);

    if (!bookId) {
      console.log("Book ID is missing");
      return res.status(400).json({ message: "Book ID is required" });
    }

    // Find session by sessionId
    console.log(`Searching for session with ID: ${sessionId}`);
    const session = await connection.query(
      "SELECT * FROM `sessions` WHERE `session_id` = :sessionId",
      {
        replacements: { sessionId },
        type: QueryTypes.SELECT,
      }
    );

    if (session.length === 0) {
      console.log("Session not found");
      return res.status(401).json({ message: "Invalid session" });
    }

    let sessionData;
    try {
      sessionData = JSON.parse(session[0].data);
    } catch (error) {
      console.error("Error parsing session data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    const userId = sessionData.user?.id;
    if (!userId) {
      console.log("User ID is missing from session data");
      return res.status(401).json({ message: "Invalid session data" });
    }
    console.log(`User ID from session: ${userId}`);

    // Check if the user has reached the request limit
    const activeRequestsCount = await RequestModel.count({
      where: {
        user_id: userId,
        status: ["pending", "borrowed", "accepted"],
      },
    });

    const isReachLimit = activeRequestsCount >= 3;
    if (isReachLimit) {
      console.log("User has reached the request limit");
    }

    // Continue with user, book, and request checks if limit not reached

    console.log(`Searching for user with ID: ${userId}`);
    const user = await UserModel.findOne({
      where: { id: userId },
      attributes: ['first_name', 'last_name', 'email'],
    });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`Searching for book with ID: ${bookId}`);
    const book = await BooksModel.findOne({
      where: { id: bookId },
    });

    if (!book) {
      console.log(`Book with ID ${bookId} not found`);
      return res.status(404).json({ message: "Book not found" });
    }

    console.log(`Book found: ${book.book_name}`);

    // Check if the bookmark exists
    const bookmark = await BookmarkModel.findOne({
      where: {
        user_id: userId,
        book_id: bookId,
      },
      attributes: ['id'],
    });

    const isBookmark = bookmark ? bookmark.id : null;
    console.log(`Bookmark ${isBookmark ? 'exists' : 'does not exist'} with ID: ${isBookmark}`);

    // Check if the user has already requested the book
    const latestRequest = await RequestModel.findOne({
      where: {
        user_id: userId,
        book_id: bookId,
      },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'status'],
    });

    let alreadyRequested = false;
    if (latestRequest) {
      const { status } = latestRequest;
      alreadyRequested = !['returned', 'cancelled', 'completed', 'rejected'].includes(status);
    }

    const responseData = {
      ...book.toJSON(),
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      isBookmarked: isBookmark,
      alreadyRequested,
      isReachLimit,
    };

    console.log("Response Data", responseData);

    res.status(200).json(responseData);
    console.log("Response sent successfully");
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }

  console.log("Fetching single book - finished");
};


// The GetBookCatalog function remains unchanged
exports.GetBookCatalog = async (req, res, next) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const filter = (req.params.filter || "newest").toLowerCase();
    const bookClass = (req.params.class || "all").toLowerCase();
    const limit = 20; // Items per page
    const offset = (page - 1) * limit;
    console.log("Page:", page, "Filter:", filter, "Class:", bookClass);

    let order;
    if (filter === "oldest") {
      order = [
        ["createdAt", "ASC"],
        ["id", "ASC"],
      ];
    } else {
      order = [
        ["createdAt", "DESC"],
        ["id", "DESC"],
      ];
    }

    let whereClause = { book_status: "active" }; // Only get active books
    if (bookClass !== "all") {
      const capitalizedClass =
        bookClass.charAt(0).toUpperCase() + bookClass.slice(1);
      whereClause.classifications_name = capitalizedClass;
    }

    const { count, rows: books } = await BooksModel.findAndCountAll({
      where: whereClause,
      order,
      limit,
      offset,
      distinct: true,
    });

    const totalPages = Math.ceil(count / limit);
    console.log(`Page: ${page}, Offset: ${offset}, Limit: ${limit}`);
    console.log(
      "Books:",
      books.map(
        (book) =>
          `ID: ${book.id}, Title: ${book.book_name}, Created: ${book.createdAt}`
      )
    );

    // Map over books and pick only id and book_img_file
    const bookData = books.map((book) => ({
      id: book.id,
      name: book.book_name,
      book_img_file: book.book_img_file,
      book_author:book.book_author,
      classifications_name: book.classifications_name,
      quantity: book.quantity,
      isBookmark: book.isBookmark
    }));

    res.status(200).json({
      books: bookData,
      currentPage: page,
      totalPages,
      totalItems: count,
      offset,
      limit,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getBookCatalogSearch = async (req, res, next) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const filter = (req.params.filter || "newest").toLowerCase();
    const bookClass = (req.params.class || "all").toLowerCase();
    const search = req.params.search ? req.params.search.toLowerCase() : null;
    const limit = 2; // Items per page
    const offset = (page - 1) * limit;

    console.log("Page:", page, "Filter:", filter, "Class:", bookClass, "Search:", search);

    let order;
    if (filter === "oldest") {
      order = [
        ["createdAt", "ASC"],
        ["id", "ASC"],
      ];
    } else {
      order = [
        ["createdAt", "DESC"],
        ["id", "DESC"],
      ];
    }

    let whereClause = { book_status: "active" };
    if (bookClass !== "all") {
      const capitalizedClass = bookClass.charAt(0).toUpperCase() + bookClass.slice(1);
      whereClause.classifications_name = capitalizedClass;
    }

    if (search) {
      whereClause[Op.or] = [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('book_name')), Op.eq, search),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('book_name')), Op.like, `%${search}%`),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('book_author')), Op.like, `%${search}%`),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('isbn_code')), Op.like, `%${search}%`),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('classifications_name')), Op.like, `%${search}%`)
      ];
    }

    const { count, rows: books } = await BooksModel.findAndCountAll({
      where: whereClause,
      order,
      limit: search ? null : limit, // Remove limit if searching to get all matches
      offset: search ? 0 : offset, // Remove offset if searching
      distinct: true,
    });

    const totalPages = Math.ceil(count / limit);

    // Prioritize search results
    let prioritizedBooks = books;
    if (search) {
      prioritizedBooks = books.sort((a, b) => {
        const aExactMatch = a.book_name.toLowerCase() === search;
        const bExactMatch = b.book_name.toLowerCase() === search;
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;
        
        const aPartialMatch = a.book_name.toLowerCase().includes(search);
        const bPartialMatch = b.book_name.toLowerCase().includes(search);
        if (aPartialMatch && !bPartialMatch) return -1;
        if (!aPartialMatch && bPartialMatch) return 1;
        
        const aClassMatch = a.classifications_name.toLowerCase() === bookClass;
        const bClassMatch = b.classifications_name.toLowerCase() === bookClass;
        if (aClassMatch && !bClassMatch) return -1;
        if (!aClassMatch && bClassMatch) return 1;
        
        return 0;
      });

      // Apply pagination after sorting
      prioritizedBooks = prioritizedBooks.slice(offset, offset + limit);
    }

    // Map over books and pick only necessary fields
    const bookData = prioritizedBooks.map((book) => ({
      id: book.id,
      name: book.book_name,
      book_author: book.book_author,
      book_img_file: book.book_img_file,
      isbn_code: book.isbn_code,
      classifications_name: book.classifications_name,
    }));

    res.status(200).json({
      books: bookData,
      currentPage: page,
      totalPages,
      totalItems: count,
      offset,
      limit,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.postBookmark = async (req, res, next) => {
  try {
    console.log("Bookmark Received Data: ", req.body);
    const { sessionId, book_id } = req.body;

    // Step 1: Check if sessionId and book_id are provided
    if (!sessionId || !book_id) {
      return res.status(400).json({
        message: "Session ID and Book ID are required.",
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
      return res.status(401).json({
        message: "Invalid session.",
      });
    }

    // Step 3: Extract user ID from session data
    const sessionData = JSON.parse(session[0].data);
    const user_id = sessionData.user.id;

    // Step 4: Check if the bookmark already exists for the same user and book
    const existingBookmark = await BookmarkModel.findOne({
      where: {
        user_id,
        book_id,
      },
    });

    if (existingBookmark) {
      // Step 5: If the bookmark exists, unbookmark (delete) it
      await existingBookmark.destroy();

      return res.status(200).json({
        message: "Bookmark successfully removed",
      });
    }

    // Step 6: If the bookmark doesn't exist, create a new one
    const newBookmark = await BookmarkModel.create({
      user_id,
      book_id,
      created_at: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("New Bookmark Created: ", newBookmark);

    return res.status(201).json({
      message: "Bookmark successfully created",
      bookmarkId: newBookmark.id,
    });
  } catch (error) {
    console.error("Error in postBookmark:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

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

    console.log("User ID is", user_id);

    // Step 4: Fetch user details
    const user = await UserModel.findOne({
      where: { id: user_id },
      attributes: ['last_name', 'first_name', 'email'],
    });

    if (!user) {
      console.log("Action: User not found, sending status 404");
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Step 5: Fetch all bookmarks for the user
    const bookmarks = await BookmarkModel.findAll({
      where: { user_id },
      attributes: ['id', 'book_id'], // Retrieve both the bookmark ID and book_id
    });

    // If no bookmarks are found, return an empty array
    if (bookmarks.length === 0) {
      console.log("Action: No bookmarks found, returning empty array with user details");
      return res.status(200).json({
        message: "No bookmarks found.",
        bookmarks: [], // Return an empty array for bookmarks
        user: {
          last_name: user.last_name,
          first_name: user.first_name,
          email: user.email,
        }
      });
    }

    // Step 6: Extract book IDs from the bookmarks
    const bookIds = bookmarks.map(bookmark => bookmark.book_id);

    // Step 7: Fetch detailed information for the bookmarked books
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

    // Step 8: Map books with isBookmark property (containing bookmark ID if exists)
    const booksWithBookmark = books.map(book => {
      const bookmark = bookmarks.find(b => b.book_id === book.id);
      return {
        ...book.toJSON(), // Convert the Sequelize object to a plain JSON object
        isBookmark: bookmark ? bookmark.id : null, // Set the bookmark ID or null if not found
      };
    });

    // Step 9: Return the list of books with isBookmark (bookmark ID) and user details
    console.log("Action: Bookmarks fetched successfully, sending status 200");
    return res.status(200).json({
      message: "Bookmarks fetched successfully",
      bookmarks: booksWithBookmark, // List of books with isBookmark containing bookmark ID
      user: {
        last_name: user.last_name,
        first_name: user.first_name,
        email: user.email,
      }
    });

  } catch (error) {
    console.error("Error in fetchBookmark:", error);
    console.log("Action: Server error, sending status 500");
    return res.status(500).json({
      message: "Server error",
    });
  }
};


exports.BottomRecoBooklist = async (req, res, next) => {
  try {
    const bookClass = req.params.class || "all";

    let whereClause = { book_status: "active" }; // Only get active books
    if (bookClass !== "all") {
      // Capitalize the first letter of the class name
      const capitalizedClass =
        bookClass.charAt(0).toUpperCase() + bookClass.slice(1);
      whereClause.classifications_name = capitalizedClass;
    }

    // Fetch 10 random books related to the class
    const books = await BooksModel.findAll({
      where: whereClause,
      order: Sequelize.literal('RAND()'), // Random ordering
      limit: 10, // Limit to 10 books
    });

    // Map over books and select the necessary fields
    const bookData = books.map((book) => ({
      id: book.id,
      name: book.book_name,
      book_img_file: book.book_img_file,
      quantity: book.quantity,
      isBookmark: book.isBookmark
    }));

    res.status(200).json({
      books: bookData,
      totalItems: books.length,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};