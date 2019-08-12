let express = require('express');
let router = express.Router();
let APIResponse = require('../response/APIResponse'); //Include APIResponse Class
let APIException = require('../exception/APIException');//Include APIException Class
const AccountError = require(appRoot + '/exception/AccountError');

let Account = require(appRoot + '/class/account');

router.post('/', (req, res, next) => {
    let data = req.body;
    //username verification
    if(data.username == undefined || typeof(data.username) != 'string'){
        throw new APIException("Invalid username", 401);
    }
    if(data.username.length < 1 || data.username == "") {
        throw new APIException("Username cannot be empty", 401);
    }

    //password verification
    if(data.password == undefined || typeof(data.password) != 'string'){
        throw new APIException("Invalid password", 401);
    }
    if(data.password.length < 1 || data.password == "") {
        throw new APIException("Password cannot be empty", 401);
    }

    //Passes data to registration handler
    let account = new Account(data.username, data.password);
    try {
        account.register();
    }catch(err){
        if(err instanceof AccountError){
            throw new APIException(err.message, 401);
        }else{
            throw new APIException("Server Error" , 500, err.message);
        }
    }
    res.json(new APIResponse());
});

module.exports = router;