const qr = require("qrcode");
const fs = require("fs").promises; // Using fs.promises for async file operations
const path = require("path");
const BooksModel = require("../../../model/Books");
const NotificationsModel = require("../../../model/Notifications");
const UserModel = require("../../../model/user");

const { Op } = require("sequelize");

const moment = require("moment"); // Make sure you have moment.js installed

exports.fetchSingleBook = async (req, res, next) => {
  console.log("Fetching single book - started");

  try {
    // . Get the bookId from query parameters
    const { bookId } = req.params;
    console.log(`Received bookId: ${bookId}`);

    if (!bookId) {
      console.log("Book ID is missing");
      return res.status(400).json({ message: "Book ID is required" });
    }

    // . Find the book using BooksModel
    console.log(`Searching for book with ID: ${bookId}`);
    const book = await BooksModel.findOne({
      where: { id: bookId }, // Changed from bookId to id
    });

    if (!book) {
      console.log(`Book with ID ${bookId} not found`);
      return res.status(404).json({ message: "Book not found" });
    }

    console.log(`Book found: ${book.book_name}`); // Changed book.bookname to book.book_name

    // . Prepare the response data
    const responseData = {
      ...book.toJSON(),
    };
    console.log("Response data prepared");

    // . Send the response
    console.log("Sending response to client");
    res.status(200).json(responseData);
    console.log("Response sent successfully");
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }

  console.log("Fetching single book - finished");
};

exports.fetchSingleBookEdit = async (req, res, next) => {
  console.log("Fetching single book - started");

  try {
    // Get the bookId from query parameters
    const { bookId } = req.params;
    console.log(`Received bookId: ${bookId}`);

    if (!bookId) {
      console.log("Book ID is missing");
      return res.status(400).json({ message: "Book ID is required" });
    }

    // Find the book using BooksModel
    console.log(`Searching for book with ID: ${bookId}`);
    const book = await BooksModel.findOne({
      where: { id: bookId },
    });

    if (!book) {
      console.log(`Book with ID ${bookId} not found`);
      return res.status(404).json({ message: "Book not found" });
    }

    console.log(`Book found: ${book.book_name}`);

    // Prepare the response data
    const responseData = {
      ...book.toJSON(),
    };
    console.log("Response data prepared");

    // Send the response
    console.log("Sending response to client");
    res.status(200).json(responseData);
    console.log("Response sent successfully");
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }

  console.log("Fetching single book - finished");
};

exports.bookTable = async (req, res, next) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const filter = (req.params.filter || "newest").toLowerCase();
    const bookClass = (req.params.class || "all").toUpperCase();
    const bookStatus = ["active", "archived", "deleted"].includes(
      req.params.book_status?.toLowerCase()
    )
      ? req.params.book_status.toLowerCase()
      : "active";

    const limit = 10; // Items per page
    const offset = (page - 1) * limit;

    console.log(
      "Page:",
      page,
      "Filter:",
      filter,
      "Class:",
      bookClass,
      "Status:",
      bookStatus
    );

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

    let whereClause = {
      book_status: bookStatus,
    };

    if (bookClass !== "ALL") {
      const capitalizedClass =
        bookClass.charAt(0).toUpperCase() + bookClass.slice(1);
      whereClause.classifications_name = capitalizedClass;
    }

    // Search functionality
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase(); // Convert search term to lowercase
      whereClause[Op.or] = [
        {
          book_name: {
            [Op.like]: `${searchTerm}%`, // Search by book name
          },
        },
        {
          book_author: {
            [Op.like]: `${searchTerm}%`, // Search by book author
          },
        },
        {
          isbn_code: {
            [Op.like]: `${searchTerm}%`, // Search by ISBN code
          },
        },
        // Add more search fields here if necessary
      ];
    }

    // Fetch books with the current filters
    const { count, rows: books } = await BooksModel.findAndCountAll({
      where: whereClause,
      order,
      limit,
      offset,
      distinct: true,
    });

    // Check and update archived books that are more than 30 days old
    for (let book of books) {
      if (book.book_status === "archived") {
        const updatedAt = moment(book.updatedAt);
        const currentDate = moment();
        const daysDiff = currentDate.diff(updatedAt, "days");

        // If the book was updated more than 30 days ago, update the status to "deleted"
        if (daysDiff > 30) {
          await BooksModel.update(
            { book_status: "deleted" },
            {
              where: { id: book.id },
            }
          );
        }
      }
    }

    const totalPages = Math.ceil(count / limit);
    console.log(`Page: ${page}, Offset: ${offset}, Limit: ${limit}`);
    console.log(
      "Books:",
      books.map(
        (book) =>
          `ID: ${book.id}, Title: ${book.book_name}, Created: ${book.createdAt}`
      )
    );

    res.status(200).json({
      books,
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

exports.postEditBooks = async (req, res, next) => {
  try {
    const {
      id,
      book_name,
      book_author,
      isbn_code,
      classifications_name,
      quantity,
      description,
      book_img_file: existingImage, // Existing image file name from the client
      book_status, // This is the book status field
      publisher, // Add publisher field
      date_of_publish, // Add date_of_publish field
      edition, // Add edition field
    } = req.body;

    // Log the received data
    console.log("Received data:", {
      id,
      book_name,
      book_author,
      isbn_code,
      classifications_name,
      quantity,
      description,
      existingImage,
      book_status,
      publisher,
      date_of_publish,
      edition,
    });

    // Find the book by id
    const book = await BooksModel.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let newImageFileName = existingImage || book.book_img_file; // Default to existing image

    // If a new file is uploaded, handle file replacement
    if (req.file) {
      const newImagePath = path.join(
        __dirname,
        "../../../../client/public/Book Image",
        req.file.filename
      );

      try {
        // Attempt to upload the new file first
        await fs.access(newImagePath); // Ensures the file has been uploaded

        // Now safely remove the old image if it exists
        const oldImagePath = path.join(
          __dirname,
          "../../../../client/public/Book Image",
          book.book_img_file
        );
        try {
          // Check if the old file exists and delete it
          await fs.access(oldImagePath);
          await fs.unlink(oldImagePath);
          console.log("Old image deleted:", oldImagePath);
        } catch (err) {
          console.log("Old image not found, skipping deletion.");
        }

        // Use the new image file name after the old one is deleted
        newImageFileName = req.file.filename;
        console.log("New uploaded file:", req.file.filename);
      } catch (uploadErr) {
        // If the new file was not successfully uploaded, cancel the operation
        console.error("Error during file upload:", uploadErr);
        return res
          .status(500)
          .json({ message: "File upload failed. Please try again." });
      }
    }

    // Update the book with new data, including the additional fields
    await book.update({
      book_name,
      book_author,
      isbn_code,
      classifications_name,
      quantity,
      description,
      book_img_file: newImageFileName, // Update with the new or existing image file name
      book_status, // Update the book_status field
      publisher, // Update the publisher field
      date_of_publish, // Update the date_of_publish field
      edition, // Update the edition field
    });

    // Respond with a success message
    res.status(200).json({ message: "Book edited successfully" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.postUpdateBookStatus = async (req, res) => {
  const { book_id } = req.params; // Get book ID from URL parameters
  let { status } = req.body; // Use 'let' here so you can modify the status

  console.log("Incoming Request postUpdateBookStatus", req.body);

  // If the status is 'unarchive', change it to 'archived'
  if (status === "unarchive") {
    status = "active";
  }

  // Validate the status value
  const validStatuses = ["archived", "active", "deleted"];
  if (!status || !validStatuses.includes(status)) {
    return res
      .status(400)
      .json({
        message:
          "Invalid status value. It must be 'archived', 'active', or 'deleted'.",
      });
  }

  try {
    // Find the book by ID
    const book = await BooksModel.findOne({ where: { id: book_id } });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update the book status
    book.book_status = status; // Update the book_status field
    await book.save();

    res.status(200).json({ message: "Book status updated successfully" });
  } catch (error) {
    console.error("Error updating book status:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the book status" });
  }
};

exports.postCreateBooks = async (req, res, next) => {
  try {
    const {
      bookname,
      authorname,
      isbncode,
      classifications,
      quantity,
      description,
      publisher, // New field
      date_of_publish, // New field
      edition, // New field
    } = req.body;

    // Check if all required fields are present
    if (
      !bookname ||
      !authorname ||
      !isbncode ||
      !classifications ||
      !quantity ||
      !description ||
      !publisher || // New validation
      !date_of_publish || // New validation
      !edition // New validation
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the book entry first to get its primary ID (e.g., book_id)
    const newBook = await BooksModel.create({
      book_name: bookname,
      book_author: authorname,
      book_img_file: req.file ? req.file.filename : "no-image.png",
      isbn_code: isbncode,
      classifications_name: classifications,
      quantity: parseInt(quantity),
      description,
      publisher, // Save new field
      date_of_publish, // Save new field
      edition, // Save new field
      book_status: "active",
    });

    const bookId = newBook.id;

    // Create notifications for each user
    const users = await UserModel.findAll();
    const notifications = users.map((user) => ({
      account_id: user.id,
      descriptions: `New Book Created: ${bookname}`,
      href: `/student/book?bookId=${bookId}`,
      type: "book",
      isRead: 0,
    }));

    await NotificationsModel.bulkCreate(notifications);

    // Generate QR code
    const bookUrl = `http://localhost:5173/student/book?bookId=${bookId}`;
    const formattedClassifications = classifications.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    );
    const qrFileName = `${Date.now()}_${bookId}_${formattedClassifications}_qr.png`;
    const qrFilePath = path.join(
      __dirname,
      "../../../../client/public/QR Image",
      qrFileName
    );

    await qr.toFile(qrFilePath, bookUrl);

    // Update the book with the QR code
    await newBook.update({
      book_img_qr: qrFileName,
    });

    res.status(201).json({
      message: "Book created successfully and notifications sent",
      book: newBook,
      qrCode: bookUrl,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
