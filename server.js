'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const weather = require('./modules/weather.js');
const getMovie = require('./modules/movie');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/', (req, res) =>{
  res.send('Welcome to City Explorer!');
})

app.get('/weather', weatherHandler);
app.get('/movie', getMovie); 

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(500).send('Sorry. Something went wrong!')
  });
}  

app.listen(PORT, () => console.log(`Server up on ${PORT}`));