/////////////// Import required Libraries
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');

const app = express();

//////////////////////Middleware///////////////////

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


////////////// Route Middleware ///////////////////
app.use('/',require('./routes'));

app.listen(3000, function(err){
    if(err)
        console.log(err);
    console.log("Server is up and running");
});