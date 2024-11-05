const Express = require('express');
const router = Express.Router()

const LogOutCon = require("../controller/logout");


router.post('/logout', LogOutCon.PostLogout);


module.exports = router;
