const path = require("path").promise;
const express = require("express");
const router = express.Router();

const BookFetch = require("../../controller/admin/Books/HandleBooks");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../client/public/Book Image");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});


const upload = multer({storage})
router.get("/table_book/view/:bookId?" ,BookFetch.fetchSingleBook);
router.get("/table_book/view/edit/:bookId?" ,BookFetch.fetchSingleBookEdit);
router.get("/table_book/:page?/:filter?/:class?/:book_status?" ,BookFetch.bookTable);

router.post("/update_book_status/:book_id", BookFetch.postUpdateBookStatus)

router.post("/create_book", upload.single('bookimage')  ,BookFetch.postCreateBooks);
router.post("/edit", upload.single("book_image"), BookFetch.postEditBooks);

module.exports = router;
