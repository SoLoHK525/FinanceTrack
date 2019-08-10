let express = require('express');
let router = express.Router();
let APIResponse = require('./response/APIResponse'); //Include APIResponse Class
let APIException = require('./exception/APIException');//Include APIException Class

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