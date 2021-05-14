const dotenv = require ('dotenv').config();
const express = require('express');
const config = require('./server/config');

console.log(process.env.PORT);

//Database
require('./database');

const app = config(express());

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

//configs