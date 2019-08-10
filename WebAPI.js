let express = require('express');
let router = express.Router();
let API = require('./API');
let APIResponse = require('./response/APIResponse');
let APIException = require('./exception/APIException');

router.get('/', (req, res, next) => {
    next();
});

router.get('/v1', (req, res, next) => {
    next();
});

router.get('/v1/error', (req, res, next) => {
    throw new APIException("This is an error test", 500);
});

router.get('/v1/response', (req, res, next) => {
    res.json(new APIResponse());
});

router.all('*', (req, res) => {
    throw new APIException(null, 404);
})


module.exports = router;