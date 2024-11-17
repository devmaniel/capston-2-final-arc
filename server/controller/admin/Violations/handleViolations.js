const ViolationsModel = require("../../../model/violations.js");
const UserModel = require("../../../model/user");
const LRNModel = require("../../../model/lrn");

const { Op } = require('sequelize');

exports.fetchTableViolations = async (req, res, next) => {
    try {
        console.log("fetchTableViolations API called");

        const { filter = 'newest', status = 'all', search = '' } = req.query;

        // Prepare conditions
        const whereConditions = {};
        if (status !== 'all') {
            if (status === 'violated') {
                whereConditions.type_of_violation = ['violated-lost', 'violated-damages'];
            } else {
                whereConditions.status = status;
            }
        }

        if (search) {
            whereConditions.first_name = { [Op.iLike]: `%${search}%` }; // Case-insensitive search
        }

        // Fetch violations
        const violations = await ViolationsModel.findAll({
            where: whereConditions,
            order: [['createdAt', filter.toLowerCase() === 'oldest' ? 'ASC' : 'DESC']],
            attributes: [
                'id', 'user_id', 'type_of_violation', 'date_issued',
                'createdAt', 'status'
            ]
        });

        const violationsWithDetails = await Promise.all(
            violations.map(async (violation) => {
                const user = await UserModel.findOne({
                    where: { id: violation.user_id },
                    attributes: [
                        'id', 'last_name', 'first_name', 'middle_name',
                        'email', 'phone_number', 'acc_lrn', 'profileImage'
                    ]
                });

                let lrnInfo = null;
                if (user?.acc_lrn) {
                    lrnInfo = await LRNModel.findOne({
                        where: { valid_lrn: user.acc_lrn }
                    });
                }

                return {
                    firstname: lrnInfo?.first_name || null,
                    lastname: lrnInfo?.last_name || null,
                    middlename: lrnInfo?.middle_name || null,
                    section: lrnInfo?.section || null,
                    valid_lrn: lrnInfo?.valid_lrn || null,
                    track: lrnInfo?.track || null,
                    id_violations: violation.id,
                    user_id: violation.user_id,
                    type_of_violation: violation.type_of_violation,
                    date_issued: violation.date_issued,
                    createdAt: violation.createdAt,
                    status: violation.status,
                    profileImage: user?.profileImage || null
                };
            })
        );

        // Apply A-Z/Z-A filtering
        if (['a-z', 'z-a'].includes(filter.toLowerCase())) {
            violationsWithDetails.sort((a, b) => {
                const nameA = a.firstname?.toLowerCase() || '';
                const nameB = b.firstname?.toLowerCase() || '';
                return filter.toLowerCase() === 'a-z'
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
            });
        }

        res.status(200).json({
            message: violations.length ? "Violations fetched successfully" : "No violations found",
            data: violationsWithDetails
        });

    } catch (error) {
        console.error("Error in fetchTableViolations:", error);
        res.status(500).json({
            message: "Error fetching violations",
            error: error.message
        });
    }
};


exports.fetchSpecificViolations = async (req, res, next) => {
    try {
        console.log("fetchSpecificViolations API called");

        // Step 1: Extract violations_id from the query parameters
        const { violations_id } = req.query;

        if (!violations_id) {
            return res.status(400).json({ message: "Violations ID is required" });
        }

        // Step 2: Find the specific violation by ID
        const violation = await ViolationsModel.findOne({
            where: { id: violations_id }
        });

        if (!violation) {
            return res.status(404).json({ message: "Violation not found" });
        }

        // Step 3: Fetch the user associated with the violation's user_id
        const user = await UserModel.findOne({
            where: { id: violation.user_id },
            attributes: ['id', 'last_name', 'first_name', 'middle_name', 'email', 'phone_number', 'acc_lrn', 'profileImage'] // Select relevant fields including email, phone_number
        });

        let lrnInfo = null;

        // Step 4: If user exists, use their acc_lrn to find corresponding valid_lrn, year_level, and role in LRNModel
        if (user && user.acc_lrn) {
            lrnInfo = await LRNModel.findOne({
                where: { valid_lrn: user.acc_lrn },
                attributes: ['valid_lrn', 'year_level', 'role', 'first_name', 'last_name', 'middle_name', 'section', 'track'] // Include valid_lrn, year_level, role
            });
        }

        // Step 5: Return the structured object with the violation, user, and LRN details
        const violationWithDetails = {
            valid_lrn: lrnInfo ? lrnInfo.valid_lrn : null,
            firstname: lrnInfo ? lrnInfo.first_name : null, // LRN first name
            lastname: lrnInfo ? lrnInfo.last_name : null, // LRN last name
            middlename: lrnInfo ? lrnInfo.middle_name : null, // LRN middle name
            section: lrnInfo ? lrnInfo.section : null, // LRN section
            track: lrnInfo ? lrnInfo.track : null, // LRN track
            year_level: lrnInfo ? lrnInfo.year_level : null, // LRN year level
            role: lrnInfo ? lrnInfo.role : null, // LRN role
            id_violations: violation.id, // Violation ID
            user_id: violation.user_id, // User ID from violation
            type_of_violation: violation.type_of_violation, // Type of violation
            date_issued: violation.date_issued, // Date issued
            createdAt: violation.createdAt, // Created at timestamp
            status: violation.status, // Status of violation
            email: user ? user.email : null, // User email
            phone_number: user ? user.phone_number : null, // User phone number
            profileImage: user ? user.profileImage : null // User profile image
        };

        // Step 6: Send the response with the formatted data
        res.status(200).json({
            message: "Specific violation fetched successfully",
            data: violationWithDetails
        });

    } catch (error) {
        console.error("Error in fetchSpecificViolations:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
};



exports.postUpdateSpecificViolations = async (req, res, next) => {
    try {
        const { violations_id, statusUpdate } = req.body;

        console.log("Incoming Request", req.body);

        // Find the violation record by `violations_id`
        const violation = await ViolationsModel.findOne({ where: { id: violations_id } });

        if (!violation) {
            return res.status(404).json({ message: "Violation not found" });
        }

        // Update the status of the violation
        violation.status = statusUpdate;
        await violation.save();

        res.status(200).json({ message: "Violation status updated successfully" });
    } catch (error) {
        console.error("Error updating violation status:", error);
        res.status(500).json({ message: "An error occurred while updating the violation status" });
    }
};