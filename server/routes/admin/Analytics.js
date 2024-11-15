const path = require('path');
const express = require('express');
const router = express.Router();

const Single_Data_Con = require("../../controller/admin/Analytics/Single_Data");
const Array_data_Con = require("../../controller/admin/Analytics/Array_data");
// add this

// default
router.get("/total_book", Single_Data_Con.TotalBook);

router.get("/total_active_request", Single_Data_Con.TotalRequest);

router.get("/total_active_account", Single_Data_Con.TotalActiveAccount)

router.get("/total_active_violations", Single_Data_Con.TotalActiveViolations);

// analytic single data
router.get("/total_book_active", Single_Data_Con.TotalBookActive);

router.get("/total_out_of_stock", Single_Data_Con.TotalOutOfStock);

router.get("/total_borrowed_book", Single_Data_Con.TotalBorrowedBook);

// analytic single array
router.get("/most_request_strand_borrower_bar", Array_data_Con.MostFrequentStrandBorrower)

router.get("/most_request_strand_borrower", Array_data_Con.MostYearLevelBorrower)

router.get("/most_year_level_borrower", Array_data_Con.MostYearLevelSectionBorrower)

router.get("/most_borrowed_book_classifications", Array_data_Con.MostBorrowedBookClassifications )

router.get("/most_borrowed_book_title", Array_data_Con.MostBorrowedBookTitle );

module.exports = router;