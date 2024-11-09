const ModelLRN = require("../../../model/lrn");
const UserModel = require("../../../model/user");

const { Op } = require("sequelize");

const exceltojson = require("convert-excel-to-json");
const XLSX = require("xlsx");
const multer = require("multer");
const fs = require("fs-extra");
var upload = multer({ dest: "../../upload/excel" });

exports.excelLRNTABLE = async (req, res, next) => {
  try {
    // Get query parameters
    const page = parseInt(req.query.page) || 1;
    const filter = req.query.filter?.toLowerCase() || "all";
    const status = req.query.status?.toLowerCase() || "registered";
    const statuslrn = req.query.statuslrn?.toLowerCase() || "all";
    const search = req.query.search?.trim() || "";

    const limit = 8; // Number of records per page
    const offset = (page - 1) * limit;

    // Set the order based on the filter parameter
    let order;
    switch (filter) {
      case "oldest":
        order = [["createdAt", "ASC"]];
        break;
      case "a-z":
        order = [["first_name", "ASC"]];
        break;
      case "z-a":
        order = [["first_name", "DESC"]];
        break;
      case "newest":
      default:
        order = [["createdAt", "DESC"]];
        break;
    }

    // Define the where condition
    let whereCondition = {};

    // Filter by account status if not "all"
    if (status !== "all") {
      whereCondition.acc_status = status;
    }

    // Filter by status_lrn if not "all"
    if (statuslrn !== "all") {
      if (statuslrn === "enrolled" || statuslrn === "unenrolled") {
        whereCondition.status_lrn = statuslrn;
      }
    }

    // Add search conditions if a search term is provided
    if (search) {
      whereCondition[Op.or] = [
        { first_name: { [Op.like]: `%${search}%` } },
        { middle_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { valid_lrn: { [Op.like]: `%${search}%` } },
      ];
    }

    // Fetch data with or without pagination based on the search term
    let data, totalItems;

    if (search) {
      // Fetch all matching records without pagination when search is provided
      ({ rows: data, count: totalItems } = await ModelLRN.findAndCountAll({
        where: whereCondition,
        order,
      }));
    } else {
      // Fetch paginated data if no search term is provided
      ({ rows: data, count: totalItems } = await ModelLRN.findAndCountAll({
        where: whereCondition,
        order,
        limit,
        offset,
      }));
    }

    // Calculate total pages for paginated results
    const totalPages = search ? 1 : Math.ceil(totalItems / limit);

    // Respond with data and pagination info
    res.status(200).json({
      data,
      pagination: search
        ? null // No pagination info if search is provided
        : {
            currentPage: page,
            totalItems,
            totalPages,
          },
    });
  } catch (error) {
    next(error);
  }
};


// Adjusted Code
exports.getSpecificLRN = async (req, res, next) => {
  try {
    const lrnId = req.query.lrn_id;
    
    if (!lrnId) {
      return res.status(400).json({ 
        success: false,
        message: "lrn_id parameter is required" 
      });
    }

    // Use correct field name based on your schema (assuming `id` is the primary key field)
    const specificLRN = await ModelLRN.findOne({ where: { id: lrnId } });

    if (!specificLRN) {
      return res.status(404).json({ 
        success: false,
        message: "Student LRN record not found" 
      });
    }

    return res.status(200).json({
      success: true,
      data: specificLRN
    });

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid lrn_id format"
      });
    }

    console.error('Error fetching specific LRN:', err);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred"
    });
  }
};

exports.postUpdateSpecificLRN = async (req, res, next) => {
  try {
    // Get the request body
    const { 
      id, 
      last_name, 
      first_name, 
      middle_name, 
      valid_lrn, 
      section, 
      track, 
      year_level 
    } = req.body;

    // Find the student by id (LRN)
    const student = await ModelLRN.findOne({ 
      where: { id: id } 
    });

    if (!student) {
      return res.status(404).json({ 
        message: "Student not found" 
      });
    }

    // Find the associated user record using valid_lrn
    const user = await UserModel.findOne({
      where: { acc_lrn: student.valid_lrn }
    });

    if (!user) {
      return res.status(404).json({ 
        message: "Associated user not found" 
      });
    }

    // Update the student record with new data
    const updatedStudent = await student.update({
      last_name,
      first_name,
      middle_name,
      valid_lrn,
      section,
      track,
      year_level,
      updatedAt: new Date()
    });

    // Update the user record with new data
    const updatedUser = await user.update({
      last_name,
      first_name,
      middle_name,
      acc_lrn: valid_lrn, // Update acc_lrn with the new valid_lrn
      updatedAt: new Date()
    });

    // Respond with both updated records
    return res.status(200).json({ 
      message: "Student and user records updated successfully", 
      data: {
        student: updatedStudent,
        user: updatedUser
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      message: "An error occurred while updating the records", 
      error: err.message 
    });
  }
};

// Controller function
exports.excelLRN = (req, res, next) => {
  res.send(`
        <form action="/admin/excelLRN" method="post" enctype="multipart/form-data">
            <input type="file" name="file" accept=".xlsx, .xls" />
            <button type="submit">Upload Excel File</button>
        </form>
    `);
};

exports.excelLRNpost = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    header: 1,
  });

  try {
    // Define the required headers
    const requiredHeaders = [
      "last_name",
      "first_name",
      "middle_name",
      "valid_lrn",
      "section",
      "track",
      "year_level",
      "status_lrn",
      "role",
    ];

    // Validate headers
    const headers = sheet[0];
    const missingHeaders = requiredHeaders.filter(
      (header) => !headers.includes(header)
    );
    if (missingHeaders.length > 0) {
      return res.status(400).json({
        error: "Invalid Excel fields",
        details: `Missing the following required headers: ${missingHeaders.join(
          ", "
        )}`,
      });
    }

    const insertedData = [];
    const invalidData = [];
    const updatedData = [];

    for (const row of sheet.slice(1)) {
      // Skip header row
      const [
        last_name,
        first_name,
        middle_name,
        valid_lrn,
        section,
        track,
        year_level,
        status_lrn,
        role,
      ] = row;

      // Check if any required field (except middle_name) is missing or null
      if (
        !last_name ||
        !first_name ||
        !valid_lrn ||
        !section ||
        !track ||
        !year_level ||
        !status_lrn ||
        !role
      ) {
        invalidData.push({
          last_name,
          first_name,
          middle_name,
          valid_lrn,
          section,
          track,
          year_level,
          status_lrn,
          role,
          acc_status: "unregistered",
        });
        continue; // Skip to the next row without inserting
      }

      let accountId = null;
      let accStatus = "unregistered";

      const user = await UserModel.findOne({ where: { acc_lrn: valid_lrn } });
      if (user) {
        accountId = user.id;
        accStatus = "registered";
      }

      // Check if the entry already exists and needs updating
      const [lrnData, created] = await ModelLRN.upsert(
        {
          account_id: accountId,
          last_name,
          first_name,
          middle_name,
          valid_lrn,
          section,
          track,
          year_level,
          status_lrn,
          role,
          acc_status: accStatus,
        },
        { returning: true }
      );

      if (!created) {
        updatedData.push({
          last_name,
          first_name,
          middle_name,
          valid_lrn,
          section,
          track,
          year_level,
          status_lrn,
          role,
          acc_status: accStatus,
        });
      } else {
        // Add the row data to the insertedData array
        insertedData.push({
          last_name,
          first_name,
          middle_name,
          valid_lrn,
          section,
          track,
          year_level,
          status_lrn,
          role,
          acc_status: accStatus,
        });
      }
    }

    // Send both inserted, updated, and invalid data back to the client
    res.status(200).json({
      message: "Excel file processed",
      insertedData,
      updatedData,
      invalidData,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({
      error: "Failed to insert data into database",
      details: error.message,
    });
  } finally {
    fs.remove(filePath, (err) => {
      if (err) console.error(err);
    });
  }
};
