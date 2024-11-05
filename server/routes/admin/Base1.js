const path = require('path');
const express = require('express');
const router = express.Router();

const Base1Con = require('../../controller/admin/Base1');

const FetchBookList = require('../../controller/admin/Books/fetchBookList');

const HandleRequestAdmin = require("../../controller/admin/Request/HandleRequest");

// error 
const ErrorHandling = require('../../controller/error/ErrorHandler');

// error route
router.get('/invalid-request', ErrorHandling.InvalidRequest);

router.get('/Base1', Base1Con.GetTotalBook);
router.get('/Base2', Base1Con.getTotalActive);
router.get('/Base3', Base1Con.getTotalViolated);
router.get('/Base4', Base1Con.getActiveAcc);
router.get('/Base5', Base1Con.getActivityLog);
router.get('/Base6', Base1Con.totalBooksChart);

// manage books
router.get('/book-list', FetchBookList.BookData);
router.get('/book-list/test', FetchBookList.BookData);
router.get('/manage-book/booklist', FetchBookList.BookListPage);

router.get("/test_request", HandleRequestAdmin.fetchRequestTable)

module.exports = router;