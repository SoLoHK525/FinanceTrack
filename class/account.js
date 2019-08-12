const fs = require('fs');
const crypto = require('crypto');
const AccountError = require(appRoot + '/exception/AccountError');

function encrypt(content){
    return crypto.createHash('sha256').update(content).digest('hex');
}

let _Account = {};

_Account.path = appRoot + '/data/accounts/';

_Account.exists = function (username) {
    let bool = fs.existsSync(this.path + encrypt(username) + '.json');
    return bool;
}

_Account.register = function (username, password) {
    if(this.exists(username)){
        throw new AccountError("username already exists");
    }
    try {
        fs.writeFileSync(this.path + encrypt(username) + '.json', JSON.stringify(new AccountItem(username, password, {})));
    }catch(err){
        throw new Error(err);
    }
    
    return true;
}

class AccountItem {
    constructor(username, password, data){
        return {
            username,
            password: encrypt(password),
            data
        }
    }
}

class Account {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    login(){

    }

    register(){
        if(_Account.exists(this.username)){
            throw new AccountError("username already exists");
        }else{
            console.log("8");
            return _Account.register(this.username, this.password);
        }
    }
}

module.exports = Account;