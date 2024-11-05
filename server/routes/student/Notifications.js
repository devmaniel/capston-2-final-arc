

const express = require("express");
const router = express.Router();

const NotifCon = require("../../controller/student/HandleNotifications");

router.post("/get_notifcations", NotifCon.fetchNotifications)




module.exports = router;
