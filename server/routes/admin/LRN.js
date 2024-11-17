const path = require("path");
const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs-extra");
var upload = multer({ dest: "/upload/excel" });

const LRNcontroller = require("../../controller/admin/LRN/LRN");

router.get("/excelLRN", LRNcontroller.excelLRN);
router.get("/excelspecificstudent", LRNcontroller.getSpecificLRN);

router.post("/post_single_lrn_student", LRNcontroller.postAddStudent)

router.post("/excellrnupdatespecificstudent", LRNcontroller.postUpdateSpecificLRN);
router.post("/excelLRN", upload.single('file'), LRNcontroller.excelLRNpost);
router.get("/excelLRNTable",LRNcontroller.excelLRNTABLE );

module.exports = router;
