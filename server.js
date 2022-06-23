'use strict';
//REQUIRE
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
//USE
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
//ROUTES
app.get('/', (request, response) => {
  response.send('hello from our server');
})

app.get('/hello',(request, response) => {
  
  response.send('hello')
})

app.get('/weather', async (request, response) => {
  
  try{
    let cityName = request.query.searchQuery;
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
    let weatherInfo = await axios.get(url);
    let weatherData = weatherInfo.data.data.map(skies => new Forecast(skies));
    response.send(weatherData)
  }
  catch(error){
    console.log(handleError)
    handleError(error, response);
  }
})

async function getWeather (request, response, next){
  
  try{
    let cityName = request.query.searchQuery;
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
    let weatherInfo = await axios.get(url);
    let weatherData = weatherInfo.data.data.map(skies => new Forecast(skies));
    response.send(weatherData)
  }
  catch(error){
    console.log(handleError)
    handleError(error, response);
  }
};

class Forecast {
  constructor(skies) {
    this.date = skies.datetime;
    this.description = skies.weather.description;
    
    
  }
}
//ERRORS
const handleError = (error, response) => {
  response.status(500).send('Something went wrong.')
}


app.get('*', (request, response) => {
  response.send('What you are looking for, doesn\'t exist');
})
//LISTEN
app.listen(PORT,() => console.log(`LISTENING ON PORT ${PORT}`));''