const path = require('path');
const express = require('express');
const router = express.Router();

const HandleRequestAdmin = require("../../controller/admin/Request/HandleRequest");

router.get("/fetch_request_table/:status", HandleRequestAdmin.fetchRequestTable)

router.get("/fetch_specific_request/:requestId", HandleRequestAdmin.fetchSpecificRequestForm);

router.post("/post_update_request", HandleRequestAdmin.StaffUpdateRequest);

module.exports = router;