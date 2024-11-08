// const BooksModel = require("../../../model/Books");
// const RequestModel = require("../../../model/request");
// const UserModel = require("../../../model/user");
// const LRNModel = require("../../../model/lrn.js");
// const QRCode = require("qrcode");
// const NotificationsModel = require("../../../model/Notifications.js");
// const ViolationsModel = require("../../../model/violations.js");

// const path = require("path");
// const fs = require("fs");

// const twilio = require("twilio");
// const accountSid = "AC1dac80e05497e6fdc22e33c99bd179c9";
// const authToken = "7df8750d91e1b5c26bc5527b827b6b3e";
// const client = twilio(accountSid, authToken);

// const { Op } = require("sequelize");

// const checkAndUpdateViolationStatus = async (requests) => {
//   try {
//     const currentDate = new Date();
    
//     // Map through requests and check dates
//     const updatedRequests = await Promise.all(
//       requests.map(async (request) => {
//         // Find the full request data including dates
//         const fullRequest = await RequestModel.findByPk(request.id);
        
//         if (!fullRequest) {
//           return request;
//         }

//         const returnDate = new Date(fullRequest.returndate);

//         // Check if item is borrowed, overdue, and not already marked as violated
//         if (fullRequest.status === "borrowed" && 
//             currentDate > returnDate && 
//             fullRequest.status !== "violated-lost") {
            
//           console.log(`Request ${request.id} is overdue. Return date: ${returnDate}, Current date: ${currentDate}`);
          
//           // Update the status in the database
//           await RequestModel.update(
//             { status: "violated-lost" },
//             { where: { id: request.id } }
//           );
          
//           // Update the status in the current request object
//           request.status = "violated-lost";

//           // Create a violation record
//           const newViolation = await ViolationsModel.create({
//             user_id: fullRequest.user_id,
//             type_of_violation: "violated-lost",
//             status: "pending",
//             date_issued: currentDate,
//             request_id: fullRequest.id
//           });

//           console.log("New violation recorded:", newViolation);
//         }
        
//         return request;
//       })
//     );
    
//     return updatedRequests;
//   } catch (error) {
//     console.error("Error checking violation status:", error);
//     throw error;
//   }
// };

// exports.fetchRequestTable = async (req, res, next) => {
//   try {
//     const { status } = req.params; // Extract status from params
//     const { page = 1, format, search } = req.query; // Extract page, format, and search from query params

//     // Convert format to lowercase
//     const formattedQuery = format ? format.toLowerCase() : undefined;

//     const limit = 10; // Limit results to 10 per page
//     const offset = (page - 1) * limit; // Calculate the offset for pagination

//     console.log("Format", formattedQuery);
//     console.log("Search Query:", search);

//     // List of valid statuses
//     const validStatuses = [
//       "pending",
//       "accepted",
//       "rejected",
//       "borrowed",
//       "return",
//       "completed",
//       "cancelled",
//       "violated",
//     ];

//     // Step 1: Determine the status filter
//     let whereClause = {};
//     if (status !== "all") {
//       if (!validStatuses.includes(status)) {
//         return res.status(400).json({ message: "Invalid status parameter" });
//       }
//       if (status === "violated") {
//         // Focus on violated-lost and violated-damages only
//         whereClause.status = { [Op.or]: ["violated-lost", "violated-damages"] };
//       } else {
//         whereClause.status = status; // Fetch records with the specified status
//       }
//     }

//     // Step 2: Determine the order based on the format query parameter
//     let order = [["createdAt", "DESC"]]; // Default order
//     if (formattedQuery) {
//       switch (formattedQuery) {
//         case "newest":
//           order = [["createdAt", "DESC"]]; // Get latest data
//           break;
//         case "oldest":
//           order = [["createdAt", "ASC"]]; // Get oldest data
//           break;
//         case "a-z":
//           order = [["request_code", "ASC"]]; // Sort by request code A to Z
//           break;
//         case "z-a":
//           order = [["request_code", "DESC"]]; // Sort by request code Z to A
//           break;
//         default:
//           return res.status(400).json({ message: "Invalid format parameter" });
//       }
//     }

//     // Step 3: Fetch requests with pagination, status filter, and ordering
//     const requests = await RequestModel.findAll({
//       where: whereClause,
//       attributes: [
//         "id",
//         "book_qty",
//         "request_code",
//         "user_id",
//         "book_id",
//         "status",
//         "request_qr_img",
//         "createdAt",
//       ],
//       limit, // Limit the number of results per page
//       offset, // Skip the first (page - 1) * limit results
//       order, // Apply the determined order
//     });

//     // Check and update violation status
//     const updatedRequests = await checkAndUpdateViolationStatus(requests);

//     // Step 4: Filter requests by search term (if provided)
//     let filteredRequests = updatedRequests;
//     if (search) {
//       const searchLower = search.toLowerCase();
//       filteredRequests = updatedRequests.filter((request) =>
//         request.request_code.toLowerCase().includes(searchLower)
//       );
//     }

//     // Prepare an array to store formatted data
//     let requestDataArray = [];

//     // Loop through each request to fetch user and book info
//     for (const request of filteredRequests) {
//       const user = await UserModel.findOne({
//         where: { id: request.user_id },
//         attributes: ["first_name", "last_name", "middle_name"],
//       });

//       const book = await BooksModel.findOne({
//         where: { id: request.book_id },
//         attributes: [
//           "id",
//           "book_name",
//           "book_img_qr",
//           "isbn_code",
//           "classifications_name",
//         ],
//       });

//       if (user && book) {
//         const requesterName = `${user.first_name} ${
//           user.middle_name ? user.middle_name + " " : ""
//         }${user.last_name}`;

//         requestDataArray.push({
//           "Request ID": request.id,
//           "Request Status": request.status,
//           "Request Code": request.request_code,
//           "Requester Name": requesterName,
//           "Requester QR": request.request_qr_img,
//           "Book ID": book.id,
//           "Book QR": book.book_img_qr,
//           "Book Name": book.book_name,
//           "ISBN Code": book.isbn_code,
//           Classifications: book.classifications_name,
//           "Request Quantity": request.book_qty,
//           "Date Created": request.createdAt,
//         });
//       }
//     }

//     // Step 5: Pagination metadata
//     const totalItems = await RequestModel.count({ where: whereClause });
//     const totalPages = Math.ceil(totalItems / limit);
//     const currentPage = parseInt(page, 10);

//     // Step 6: Send the response
//     return res.status(200).json({
//       requests: requestDataArray, // Send the formatted requests
//       pagination: {
//         totalItems, // Total number of requests
//         totalPages, // Total number of pages
//         currentPage, // Current page number
//         pageSize: limit, // Number of requests per page
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching request table:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// exports.fetchSpecificRequestForm = async (req, res, next) => {
//   try {
//     // Extract requestId from query parameters
//     const { requestId } = req.params;
//     console.log("Received requestId:", requestId); // Log the received requestId

//     // Step 1: Fetch the request details from RequestModel
//     const request = await RequestModel.findOne({
//       where: { id: requestId },
//       attributes: [
//         "id",
//         "book_qty",
//         "request_code",
//         "status",
//         "student_comment",
//         "authorizer",
//         "admin_comment",
//         "pickupdate",
//         "returndate",
//         "user_id",
//         "book_id",
//       ],
//     });

//     if (!request) {
//       console.log("Error Request not found for requestId:", requestId); // Log not found message
//       return res.status(404).json({ message: "Request not found" });
//     }
//     console.log("Request Details:", request); // Log the request details

//     const updatedRequest = await checkAndUpdateViolationStatus([request]);

//     // Step 2: Fetch user details from UserModel
//     const user = await UserModel.findOne({
//       where: { id: request.user_id },
//       attributes: [
//         "last_name",
//         "first_name",
//         "email",
//         "phone_number",
//         "acc_lrn",
//       ],
//     });

//     if (!user) {
//       console.log("Error User not found for userId:", request.user_id); // Log not found message
//       return res.status(404).json({ message: "User not found" });
//     }
//     console.log("User Details:", user); // Log the user details

//     // Step 3: Fetch LRN details from LRNModel
//     const lrn = await LRNModel.findOne({
//       where: { valid_lrn: user.acc_lrn }, // Changed from user_id to valid_lrn
//       attributes: ["valid_lrn", "role", "year_level", "section", "track"],
//     });

//     if (!lrn) {
//       console.log("Error LRN details not found for valid_lrn:", user.acc_lrn); // Log not found message
//       return res.status(404).json({ message: "LRN details not found" });
//     }
//     console.log("LRN Details:", lrn); // Log the LRN details

//     // Step 4: Fetch book details from BooksModel
//     const book = await BooksModel.findOne({
//       where: { id: request.book_id },
//       attributes: [
//         "book_name",
//         "quantity", // Adjusted column name from book_quantity to quantity
//       ],
//     });

//     if (!book) {
//       console.log("Error Book not found for bookId:", request.book_id); // Log not found message
//       return res.status(404).json({ message: "Book not found" });
//     }
//     console.log("Book Details:", book); // Log the book details

//     // Prepare the response data
//     const responseData = {
//       request: {
//         requestId: request.id,
//         bookQty: request.book_qty,
//         requestCode: request.request_code,
//         status: request.status,
//         studentComment: request.student_comment,
//         authorizer: request.authorizer,
//         adminComment: request.admin_comment,
//         pickupDate: request.pickupdate,
//         returnDate: request.returndate,
//       },
//       user: {
//         lastName: user.last_name,
//         firstName: user.first_name,
//         email: user.email,
//         phoneNumber: user.phone_number,
//       },
//       lrn: {
//         validLrn: lrn.valid_lrn,
//         role: lrn.role,
//         yearLevel: lrn.year_level, // Corrected property name
//         section: lrn.section,
//         track: lrn.track,
//       },
//       book: {
//         bookName: book.book_name,
//         bookQuantity: book.quantity, // Adjusted property name
//       },
//     };

//     console.log("Response Data:", responseData); // Log the response data

//     // Send the response data to the client
//     return res.status(200).json(responseData);
//   } catch (error) {
//     console.error("Error fetching specific request form:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// exports.StaffUpdateRequest = async (req, res, next) => {
//   try {
//     const { requestId, adminComment, status, phone_number } = req.body;
//     console.log("Received data:", req.body);

//     if (!requestId || !status || !phone_number) {
//       console.log("Missing required fields:", {
//         requestId,
//         status,
//         phone_number,
//       });
//       return res.status(400).json({ message: "Missing required fields." });
//     }

//     const request = await RequestModel.findOne({ where: { id: requestId } });
//     if (!request) {
//       console.log("Request not found with ID:", requestId);
//       return res.status(404).json({ message: "Request not found." });
//     }

//     const requestUserId = request.user_id;

//     // Set the authorizer field automatically
//     await request.update({ admin_comment: adminComment, status, authorizer: "Ebora Mendoza" });

//     const bookId = request.book_id;
//     const bookQty = parseInt(request.book_qty, 10);
//     const book = await BooksModel.findOne({ where: { id: bookId } });

//     if (!book) {
//       console.log("Book not found with ID:", bookId);
//       return res.status(404).json({ message: "Book not found." });
//     }

//     const currentQuantity = parseInt(book.quantity, 10);

//     if (status === "borrowed") {
//       await book.update({ quantity: currentQuantity - bookQty });

//       const qrCodeData = `http://localhost:5173/student/request_history/view_request?request_id=${requestId}`;
//       const qrCodeImageBuffer = await QRCode.toBuffer(qrCodeData);
//       const qrCodeFileName = `${requestId}-qr.png`;
//       const qrCodeFilePath = path.join(__dirname, "../../../../client/public/QR Image", qrCodeFileName);
//       fs.writeFileSync(qrCodeFilePath, qrCodeImageBuffer);

//       await request.update({ request_qr_img: qrCodeFileName });

//       // Fetch pickupdate and returndate from request
//       const { pickupdate, returndate } = request;

//       // Send SMS with updated message
//       try {
//         const message = await client.messages.create({
//           body:
//             `Your Request Books is now borrowed\n` +
//             `Request Code: ${request.request_code}\n` + // Add request code here
//             `Book Name: ${book.book_name}\n` +
//             `Book Author: ${book.book_author}\n` +
//             `Pick up date: ${pickupdate}\n` +
//             `Return Date: ${returndate}\n\n` +
//             `Note: Please return the book on time and ensure it is not damaged.`,
//           from: "+12286414153",
//           to: phone_number,
//         });

//         console.log("SMS sent successfully to", phone_number);
//         console.log("Twilio response:", message.sid);
//         console.log("Message status:", message.status);
//       } catch (smsError) {
//         console.error("Error sending SMS:", smsError);
//         return res.status(200).json({ message: "Failed to send SMS." });
//       }
//     } else if (status === "returned") {
//       await book.update({ quantity: currentQuantity + bookQty });
//     }

//     // Handle violations
//     if (status === "violated-damages" || status === "violated-lost") {
//       const violationType = status;
//       const newViolation = await ViolationsModel.create({
//         user_id: requestUserId,
//         type_of_violation: violationType,
//         status: "pending",
//         date_issued: new Date(),
//       });
//       console.log("Violation recorded:", newViolation);
//     }

//     // Create notification
//     const descriptions = `Staff updated the request code: The staff has updated the request status to "${status}" for your request code ${request.request_code}`;
//     await NotificationsModel.create({
//       account_id: requestUserId,
//       descriptions,
//       href: `/student/request_history/view_request?request_id=${requestId}`,
//       type: "request",
//       isRead: 0,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });

//     res
//       .status(200)
//       .json({ message: "Request updated and notification sent successfully." });
//   } catch (error) {
//     console.error("Error updating request:", error);
//     res.status(500).json({ message: "Error updating request." });
//   }
// };
