const { Op } = require("sequelize");
const BookModel = require("../../../model/Books");
const RequestModel = require("../../../model/request");
const UserModel = require("../../../model/user");
const LRNModel = require("../../../model/lrn");
const ViolationsModel = require("../../../model/violations");

// Helper function to get date range based on the query parameter
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


exports.MostFrequentStrandBorrower = async (req, res, next) => {
    try {
        console.log("Testing the connection at /admin/analytics/most_request_strand_borrower_bar");
        console.log("Req.query.date:", req.query.date)

        // Step 1: Determine the date range based on the `date` query
        const dateRange = getDateRange(req.query.date);
        const whereClause = dateRange
            ? { createdAt: { [Op.between]: [dateRange.startDate, dateRange.endDate] } }
            : {}; // If no date range, fetch all data

        // Step 2: Fetch request data filtered by date range
        const requests = await RequestModel.findAll({ where: whereClause });

        // Initialize an object to count frequencies of each track
        const frequencyCount = {
            GAS: 0,
            COOKERY: 0,
            ICT: 0,
            STEM: 0,
            ABM: 0,
            HUMSS: 0
        };

        // Step 3: Process each request
        for (const request of requests) {
            const userId = request.user_id;

            // Step 4: Find User by user_id
            const user = await UserModel.findOne({ where: { id: userId } });
            if (!user) continue;

            // Step 5: Find LRN by valid_lrn in LRNModel where it matches UserModel's acc_lrn
            const lrn = await LRNModel.findOne({ where: { valid_lrn: user.acc_lrn } });
            if (!lrn) continue;

            // Step 6: Extract the track and count occurrences
            const track = lrn.track;
            if (frequencyCount.hasOwnProperty(track)) {
                frequencyCount[track]++;
            }
        }

        // Prepare the labels and their corresponding frequencies
        const labels = Object.keys(frequencyCount).filter(label => frequencyCount[label] > 0);
        const data = labels.map(label => frequencyCount[label]);

        // Send the response with the labels and data
        return res.status(200).json({
            message: "Function executed successfully.",
            labels: labels,
            frequency: data,
        });
    } catch (err) {
        console.error("Error in MostFrequentStrandBorrower:", err);
        return res.status(500).json({ message: "An error occurred." });
    }
};


exports.MostYearLevelSectionBorrower = async (req, res, next) => {
    try {
        console.log("Testing the connection at /admin/analytics/most_request_strand_borrower");
        console.log("Req.query.date:", req.query.date);

        // Step 1: Get date range from query parameter
        const dateRange = getDateRange(req.query.date);

        // Step 2: Set up where condition for date filtering
        const whereCondition = {};
        if (dateRange) {
            whereCondition.createdAt = {
                [Op.between]: [dateRange.startDate, dateRange.endDate]
            };
        }

        // Step 3: Get all requests with their user_id, filtered by date if applicable
        const requestRecords = await RequestModel.findAll({
            where: whereCondition,
            attributes: ['user_id']
        });

        // Step 4: Extract user_ids and get their acc_lrn from UserModel
        const userIds = requestRecords.map(record => record.user_id);
        const userRecords = await UserModel.findAll({
            where: {
                id: { [Op.in]: userIds }
            },
            attributes: ['id', 'acc_lrn'],
            raw: true
        });

        // Map userId to acc_lrn for easy lookup
        const userIdToLrnMap = userRecords.reduce((acc, user) => {
            acc[user.id] = user.acc_lrn;
            return acc;
        }, {});

        // Step 5: Get sections for each valid_lrn from LRNModel
        const validLrnList = userRecords.map(user => user.acc_lrn);
        const lrnRecords = await LRNModel.findAll({
            where: {
                valid_lrn: { [Op.in]: validLrnList }
            },
            attributes: ['valid_lrn', 'section'],
            raw: true
        });

        // Map valid_lrn to section for easy lookup
        const lrnToSectionMap = lrnRecords.reduce((acc, lrn) => {
            acc[lrn.valid_lrn] = lrn.section;
            return acc;
        }, {});

        // Step 6: Initialize sectionCounts to keep track of each section's frequency
        const sectionCounts = {};

        // Step 7: Count frequency for each section from matched user requests
        requestRecords.forEach(record => {
            const userId = record.user_id;
            const validLrn = userIdToLrnMap[userId];
            const section = lrnToSectionMap[validLrn];

            if (section) {
                sectionCounts[section] = (sectionCounts[section] || 0) + 1;
            }
        });

        // Prepare data for response
        const labels = Object.keys(sectionCounts);
        const data = Object.values(sectionCounts);

        return res.status(200).json({
            message: "Function executed successfully.",
            labels: labels,
            data: data,
            dateRange: dateRange ? {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate
            } : 'all'
        });

    } catch (err) {
        console.error("Error in MostYearLevelBorrower:", err);
        return res.status(500).json({ message: "An error occurred." });
    }
};

exports.MostYearLevelBorrower = async (req, res, next) => {
    try {
        console.log("Testing the connection at /admin/analytics/most_year_level_borrower");
        console.log("Req.query.date:", req.query.date)

        // Step 1: Get date filter from query parameter
        const dateFilter = req.query.date;
        const dateRange = getDateRange(dateFilter);

        // Step 2: Query requests within date range (if applicable)
        const whereCondition = {};
        if (dateRange) {
            whereCondition.createdAt = {
                [Op.between]: [dateRange.startDate, dateRange.endDate]
            };
        }

        // Step 3: Fetch requests with date filtering
        const requests = await RequestModel.findAll({ where: whereCondition });

        // Initialize an object to count frequencies
        const frequencyCount = {
            G11: 0,
            G12: 0
        };

        // Step 4: Process each request
        for (const request of requests) {
            const userId = request.user_id;

            // Step 5: Find User by user_id
            const user = await UserModel.findOne({ where: { id: userId } });
            if (!user) continue;

            // Step 6: Find LRN by valid_lrn in LRNModel where it matches UserModel's acc_lrn
            const lrn = await LRNModel.findOne({ where: { valid_lrn: user.acc_lrn } });
            if (!lrn) continue;

            // Step 7: Extract year_level and determine the label
            const yearLevel = lrn.year_level;
            let gradeLabel = "";

            if (yearLevel === "G12") {
                gradeLabel = "G12"; // Increment year level +1
            } else if (yearLevel === "G11") {
                gradeLabel = "G11"; // Increment year level +1
            } else {
                // Skip if year level is outside of the G11 or G12 range
                continue;
            }

            // Step 8: Count the occurrences of each label
            frequencyCount[gradeLabel]++;
        }

        // Prepare the labels and their corresponding frequencies
        const labels = Object.keys(frequencyCount).filter(label => frequencyCount[label] > 0);
        const data = labels.map(label => frequencyCount[label]);

        // Send the response with the labels and data
        return res.status(200).json({
            message: "Function executed successfully.",
            labels: labels,
            frequency: data,
        });
    } catch (err) {
        console.error("Error in MostYearLevelBorrower:", err);
        return res.status(500).json({ message: "An error occurred." });
    }
};