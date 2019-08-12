const path = require('path'); //Include path
const express = require('express'); //Include express
const helmet = require('helmet')
const app = express(); //Create express instance

global.appRoot = path.resolve(__dirname);

app.use(express.urlencoded());

app.use(helmet());
app.disable('x-powered-by');

let session = require('express-session');
let expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 2); //2 Hour
app.set('trust proxy', 1);
app.use(session({
    secret: 's3Cur3',
    name: 'sessionId',
    cookie: {
        secure: true,
        httpOnly: true,
        domain: 'localhost',
        expires: expiryDate
      }
  }));

let API = require('./API'); //Include the API-related functions
let WebAPI = require('./WebAPI'); //Include the WebAPI routes

let APP_PATH = __dirname + '/financetrack-app'; //Vue Application's path

/*
*   Static Resources
*/
app.use(express.static(APP_PATH + '/dist'));

/*
*   API Entrance
*/
app.use('/api', WebAPI);

/*
*   Vue Application
*/
app.get('*', (req, res, next) => {
    res.status(200);
    res.sendFile(path.resolve(APP_PATH + '/dist/index.html'));
});

/*
*   Express Error Middleware
*/
app.use(API.error);

app.listen(80); //Listener

console.log("Server listening on port: " + 80);