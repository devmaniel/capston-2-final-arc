const Express = require('express');
const router = Express.Router()





// Middleware library
const LoginMiddleware = require('../middleware/login');

router.post('/login', LoginMiddleware.Login);


module.exports = router;