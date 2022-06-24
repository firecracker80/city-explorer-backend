'use strict';
//REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');

//REQUIRED MODULES
const getWeather = require('./modules/weather');
const getMovie = require('./modules/movie');

//USE
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
//ROUTES
app.get('/', (request, response) => {
  response.send('hello from our server');
})

app.get('/hello', (request, response) => {

  response.send('hello')
})

app.get('/weather', getWeather);

app.get('/movie', getMovie); 

app.get('*', (request, response) => {
  response.send('What you are looking for, doesn\'t exist');
})
//LISTEN
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`)); ''