let http = require('http'); //Include for HTTP Status Code Reference
let express = require('express');
let APIException = require('./exception/APIException'); //Require the APIException Class

let API = {};

/*
*   Express Error Middleware
*/
API.error = function(err, req, res, next){
    if (err instanceof URIError) {
        res.status(400).json(API.exception("Invalid URI: " + req.url, 400, err));
    }
    if(err instanceof APIException) {
        res.status(err.status).json(API.exception(err.message, err.status, err.stack));
    }
}

/*
*   API Exception Response Formatter
*   @param string message Message shown as {message} in the response
*   @param int code HTTP Status Code
*   @param any trace Stack Error for debug purposes
*   @return object Exception Response
*/
API.exception = function (message = null, code, trace) {
    let error = "HTTP Error " + code + ": " + http.STATUS_CODES[code];
    let exception = {
        success: false,
        error
    }

    if(typeof(code) != 'number'){
       return API.exception(null, 500, new Error("Invalid HTTP Status Code"));
    }

    if(typeof(message) === 'string' && message.length > 0){
        exception.message = message;
    }

    if(process.env.debug === 'true' && process.env.NODE_ENV === 'dev') {
        if(typeof(trace) != 'string'){
            trace = JSON.stringify(trace);
        }
        exception.trace = trace;
    }

    exception.server_time = new Date();
    return exception;
}

module.exports = API;