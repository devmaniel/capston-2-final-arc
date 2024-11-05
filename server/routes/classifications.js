const path = require("path");
const express = require("express");
const router = express.Router();

const classificationsCon = require('../controller/admin/classifications');


router.get("/allclass", classificationsCon.fetchAllClass);

module.exports = router;
