const path = require('path');
const express = require('express');
const router = express.Router();

const HandleStudent = require("../../controller/admin/Students/HandleStudents")

router.get("/fetch_student_table", HandleStudent.StudentTable)
router.get("/fetch_single_student", HandleStudent.getSpecificStudent)

module.exports = router;