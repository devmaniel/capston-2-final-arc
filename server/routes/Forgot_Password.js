const express = require("express");
const router = express.Router();

const Handle_Forgot_Password_Con = require("../../controller/student/HandleForgotPassword");

router.post("/forgot_password", Handle_Forgot_Password_Con.HandlePasswordPost);

router.post(
  "/forgot_password_change",
  Handle_Forgot_Password_Con.HandlePasswordChangePost
);

module.exports = router;
