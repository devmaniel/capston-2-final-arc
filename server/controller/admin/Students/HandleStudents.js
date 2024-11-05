const UserModel = require('../../../model/user');
const LRNModel = require("../../../model/lrn");

const {Op} = require("sequelize")


exports.StudentTable = async (req, res, next) => {
  try {

    // WORKING
    // Get pagination details, filter, status, and search from query params
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Number of records per page
    const offset = (page - 1) * limit; // Calculate offset for pagination
    const filter = (req.query.filter || '').toLowerCase(); // Ensure lowercase for filters
    const status = (req.query.status || '').toLowerCase(); // Ensure lowercase for status
    const search = (req.query.search || '').toLowerCase(); // Ensure lowercase for search

    // Validate status filter: must be either 'active', 'violated', or 'all'
    const validStatuses = ['active', 'violated', 'all'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Sorting logic based on filter (A-Z, Z-A, Newest, Oldest)
    let order = [];
    if (filter === 'a-z') {
      order = [['first_name', 'ASC']]; // Sort by first_name ascending
    } else if (filter === 'z-a') {
      order = [['first_name', 'DESC']]; // Sort by first_name descending
    } else if (filter === 'newest') {
      order = [['createdAt', 'DESC']]; // Sort by creation date descending (newest first)
    } else if (filter === 'oldest') {
      order = [['createdAt', 'ASC']]; // Sort by creation date ascending (oldest first)
    }

    // Build the status filter condition
    let statusCondition = {};
    if (status === 'all') {
      statusCondition = { [Op.ne]: null }; // If status is "all", do not apply any filtering (fetch all records)
    } else if (status) {
      statusCondition = status; // Apply strict filtering for specific statuses
    }

    // Build the search condition
    let searchCondition = {};
    if (search) {
      searchCondition = {
        [Op.or]: [
          { first_name: { [Op.like]: `%${search}%` } },
          { last_name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { phone_number: { [Op.like]: `%${search}%` } },
          // Add more fields as necessary for search
        ]
      };
    }

    // Fetch users with optional status and search filtering and pagination
    const users = await UserModel.findAll({
      attributes: ['id', 'email', 'phone_number', 'profileImage', 'status', 'acc_lrn', 'first_name', 'createdAt'],
      where: {
        ...searchCondition,
        status: statusCondition // Apply status condition dynamically
      },
      order, // Apply sorting based on filter
      offset, // Apply pagination offset
      limit // Apply limit for pagination
    });

    // Extract all acc_lrn values from users
    const accLrnValues = users.map(user => user.acc_lrn);

    // Find matching LRN records where valid_lrn matches acc_lrn from UserModel
    const lrns = await LRNModel.findAll({
      where: {
        valid_lrn: accLrnValues // Match the valid_lrn from LRNModel with acc_lrn from UserModel
      },
      attributes: ['id', 'acc_status', 'last_name', 'first_name', 'middle_name', 'valid_lrn', 'section', 'track', 'year_level', 'status_lrn', 'role']
    });

    // Construct the final array of objects combining users and lrns
    const data = users.map(user => {
      const lrn = lrns.find(lrnRecord => lrnRecord.valid_lrn === user.acc_lrn);

      return {
        userid: user.id,
        email: user.email,
        phone_number: user.phone_number,
        profileImage: user.profileImage,
        status: user.status,
        lrnid: lrn ? lrn.id : null,
        acc_status: lrn ? lrn.acc_status : null,
        role: lrn ? lrn.role : null,
        track: lrn ? lrn.track : null,
        last_name: lrn ? lrn.last_name : null,
        first_name: lrn ? lrn.first_name : null,
        middle_name: lrn ? lrn.middle_name : null,
        valid_lrn: lrn ? lrn.valid_lrn : null,
        section: lrn ? lrn.section : null
      };
    });

    // Return paginated data response
    res.status(200).json({
      data, // Array of combined user and LRN data
      pagination: {
        currentPage: page,
        perPage: limit,
        totalItems: await UserModel.count({ where: { ...searchCondition, status: statusCondition } }),
        totalPages: Math.ceil(await UserModel.count({ where: { ...searchCondition, status: statusCondition } }) / limit)
      }
    });
  } catch (error) {
    // Error handling
    res.status(500).json({ message: "Error fetching student data", error: error.message });
  }
};



exports.getSpecificStudent = async (req, res, next) => {
  try {
    // Access the student_id from query parameters
    const studentId = req.query.student_id;

    // Log the student_id value
    console.log("Student ID:", studentId);

    // Find the user by their studentId in UserModel
    const student = await UserModel.findOne({
      where: { id: studentId }
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Use the student's acc_lrn to search in the LRNModel
    const lrnData = await LRNModel.findOne({
      where: { valid_lrn: student.acc_lrn }
    });

    if (!lrnData) {
      return res.status(404).json({ message: "LRN not found for the student" });
    }

    // Respond with the fetched student and LRN data
    res.status(200).json({
      message: "Student and LRN data fetched successfully",
      student,
      lrnData
    });
  } catch (error) {
    console.error("Error fetching student and LRN data:", error);
    res.status(500).json({ message: "Error fetching student and LRN data", error: error.message });
  }
};