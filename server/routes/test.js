const path = require("path");
const express = require("express");
const router = express.Router();

const TestRoute = require("../../server/controller/admin/Test");

const TestEmail = require('../controller/test/EmailerCode');

const TestJWT = require('../controller/test/TestJWT');

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./upload/Book Image");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({storage})

router.get("/get", TestRoute.getTest);
router.get("/getImage", TestRoute.getImageTest);
router.post("/postest" , upload.single('bookimage') ,TestRoute.postTest); 
router.post("/postimage", upload.single('file') , TestRoute.postImageTest); // post image (multer)


// emailer
router.get('/mailer', TestEmail.TestEmailer);
router.post('/post-otp', TestEmail.sendOTP);
router.post('/verify-otp', TestEmail.verifyOTP);


// jwt login/register
router.get('/jwtform', TestJWT.LoginHTML);
router.post('/jwt-login', TestJWT.TestLoginPost);
router.get('/success', TestJWT.AuthMiddleware, TestJWT.Success);
router.get('/logout', TestJWT.Logout);



module.exports = router;
