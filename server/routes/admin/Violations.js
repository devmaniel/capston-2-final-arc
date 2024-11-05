const path = require('path');
const express = require('express');
const router = express.Router();

const ViolationController = require("../../controller/admin/Violations/handleViolations");

router.get("/fetch_table_violations", ViolationController.fetchTableViolations);
router.get("/fetch_specific_violations", ViolationController.fetchSpecificViolations);

router.post("/post_update_specific_violations", ViolationController.postUpdateSpecificViolations)

module.exports = router;