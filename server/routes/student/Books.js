

const express = require("express");
const router = express.Router();

const BookController = require('../../controller/student/HandleBooks')

const RequestController = require("../../controller/student/HandleRequest");

router.post("/fetch-single-book", BookController.fetchSingleBook);
router.get("/table_book/:page?/:filter?/:class?/active", BookController.GetBookCatalog);
router.get("/table_book/:page?/:filter?/:class?/active/:search", BookController.getBookCatalogSearch);


router.get("/table_book_bottom/:class?", BookController.BottomRecoBooklist);


router.post("/post_bookmark", BookController.postBookmark);
router.post("/bookmark/post_fetch_bookmark", BookController.fetchBookmark);



module.exports = router;
