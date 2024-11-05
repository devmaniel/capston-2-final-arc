const Express = require("express");
const router = Express.Router();

// Middleware library
const RegisterController = require("../controller/student/Register");

router.post("/post-lrn", RegisterController.PostLRNStep1);
router.post("/post-otp", RegisterController.PostLRNStep2);
router.post("/verify-otp", RegisterController.PostLRNStep3);
router.post("/verify-phone", RegisterController.PostLRNStep4)


module.exports = router;
