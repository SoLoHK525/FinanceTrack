const path = require('path');
let express = require('express');
let app = express();

let API = require('./API');
let WebAPI = require('./WebAPI');

let APP_PATH = __dirname + '/financetrack-app';

app.use(express.static(APP_PATH + '/dist'));

app.use('/api', WebAPI);

app.get('*', (req, res, next) => {
    res.status(200);
    res.sendFile(path.resolve(APP_PATH + '/dist/index.html'));
});

app.use(API.error);

app.listen(80);

console.log("Server listening on port: " + 80);