const { Op } = require("sequelize");
const BookModel = require("../../../model/Books");
const RequestModel = require("../../../model/request");
const UserModel = require("../../../model/user");
const LRNModel = require("../../../model/lrn");
const ViolationsModel = require("../../../model/violations");

// add this

exports.MostFrequentStrandBorrower = async (req, res, next) => {
    try {
        console.log("Testing the connection at /admin/analytics/most_request_strand_borrower_bar");

        // Step 1: Get all request data
        const requests = await RequestModel.findAll();

        // Initialize an object to count frequencies of each track
        const frequencyCount = {
            GAS: 0,
            COOKERY: 0,
            ICT: 0,
            STEM: 0,
            ABM: 0,
            HUMSS: 0
        };

        // Step 2: Process each request
        for (const request of requests) {
            const userId = request.user_id;

            // Step 3: Find User by user_id
            const user = await UserModel.findOne({ where: { id: userId } });
            if (!user) continue;

            // Step 4: Find LRN by valid_lrn in LRNModel where it matches UserModel's acc_lrn
            const lrn = await LRNModel.findOne({ where: { valid_lrn: user.acc_lrn } });
            if (!lrn) continue;

            // Step 5: Extract the track and count occurrences
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

exports.MostYearLevelBorrower = async (req, res, next) => {
    try {
        console.log("Testing the connection at /admin/analytics/most_request_strand_borrower");

        // Step 1: Get all requests with their user_id
        const requestRecords = await RequestModel.findAll({
            attributes: ['user_id']
        });

        // Step 2: Extract user_ids and get their acc_lrn from UserModel
        const userIds = requestRecords.map(record => record.user_id);
        const userRecords = await UserModel.findAll({
            where: {
                id: { [Op.in]: userIds }
            },
            attributes: ['id', 'acc_lrn'],
            raw: true // Use raw for direct object format
        });

        // Map userId to acc_lrn for easy lookup
        const userIdToLrnMap = userRecords.reduce((acc, user) => {
            acc[user.id] = user.acc_lrn;
            return acc;
        }, {});

        // Step 3: Get sections for each valid_lrn from LRNModel
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

        // Step 4: Initialize sectionCounts to keep track of each section's frequency
        const sectionCounts = {};

        // Step 5: Count frequency for each section from matched user requests
        requestRecords.forEach(record => {
            const userId = record.user_id;
            const validLrn = userIdToLrnMap[userId];
            const section = lrnToSectionMap[validLrn];

            // Only count if section is found in lrnToSectionMap
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
            data: data
        });

    } catch (err) {
        console.error("Error in MostYearLevelBorrower:", err);
        return res.status(500).json({ message: "An error occurred." });
    }
};



exports.MostYearLevelBorrower = async (req, res, next) => {
    try {
        console.log("Testing the connection at /admin/analytics/most_year_level_borrower");

        // Step 1: Get all request data
        const requests = await RequestModel.findAll();

        // Initialize an object to count frequencies
        const frequencyCount = {
            G11: 0,
            G12: 0
        };

        // Step 2: Process each request
        for (const request of requests) {
            const userId = request.user_id;

            // Step 3: Find User by user_id
            const user = await UserModel.findOne({ where: { id: userId } });
            if (!user) continue;

            // Step 4: Find LRN by valid_lrn in LRNModel where it matches UserModel's acc_lrn
            const lrn = await LRNModel.findOne({ where: { valid_lrn: user.acc_lrn } });
            if (!lrn) continue;

            // Step 5: Extract year_level and determine the label
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

            // Step 6: Count the occurrences of each label
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