const path = require("path").promise;
const express = require("express");
const router = express.Router();

const HandleProfileCon = require("../../controller/student/HandleProfile");

const multer = require("multer");

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "../client/public/Profile Image");
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`);
    },
  });

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

router.post("/fetch_profile", HandleProfileCon.fetchProfileInfo);

router.post("/change_pass", HandleProfileCon.postChangePassword);

router.post("/upload_pfp",  upload.single("profileImage"), HandleProfileCon.postUploadProfilePicture);

module.exports = router;
