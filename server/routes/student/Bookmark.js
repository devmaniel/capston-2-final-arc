

const express = require("express");
const router = express.Router();

const BookmarkController = require('../../controller/student/HandleBookmark');


router.post("/fetch_bookmark", BookmarkController.fetchBookmark);

module.exports = router;