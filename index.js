const path = require('path'); //Include path
let express = require('express'); //Include express
let app = express(); //Create express instance

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