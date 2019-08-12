let express = require('express');
let router = express.Router();
let APIResponse = require('./response/APIResponse'); //Include APIResponse Class
let APIException = require('./exception/APIException');//Include APIException Class

let modules = {};

modules.login = require('./modules/login');
modules.register = require('./modules/register');


/*
*   API Entrance Middleware
*/
router.get('/', (req, res, next) => {
    next();
});

/*
*   API Version 1.0
*/
router.get('/v1', (req, res, next) => {
    next();
});

router.use('/v1/login', modules.login);
router.use('/v1/register', modules.register);

router.get('/v1/error', (req, res, next) => {
    throw new APIException("This is an error test", 500);
});

router.get('/v1/response', (req, res, next) => {
    res.json(new APIResponse());
});

/*
*   The remaining routes will throw a HTTP 404 Error
*/
router.all('*', (req, res) => {
    throw new APIException(null, 404);
})


module.exports = router;