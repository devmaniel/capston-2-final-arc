

const express = require("express");
const router = express.Router();

const StudentHandleRequest = require("../../controller/student/HandleRequest.js");

router.post("/single_request", StudentHandleRequest.PostSingleRequest);

router.post("/bookmark/post_multiple_request_bookmark", StudentHandleRequest.postBookmarkRequest);

router.post("/postfetch_bookmark_history", StudentHandleRequest.fetchPostRequestHistory);

router.post("/postcancel_request_student", StudentHandleRequest.postCancelRequest)


router.post('/qr_singleview_request', StudentHandleRequest.QRviewSingleRequest);



module.exports = router;
