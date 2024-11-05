const Express = require('express');
const router = Express.Router()

const LoginCon = require('../controller/login.js');

router.post('/find-session', LoginCon.FindSession); // session/find-session

module.exports = router;