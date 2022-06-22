'use strict';
//REQUIRE
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors')
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

app.get('/city', (request, response) => {
  
  try{
    console.log(request.query);
    let cityName = request.query.searchQuery.toLowerCase();
    console.log(cityName);
    let dataToSee = data.find(weather => weather.city_name.toLowerCase() === cityName)
    let searchQuery = [];
    for(let i=0; i<dataToSee.data.length; i++){
        console.log(dataToSee.data[i]);
        searchQuery.push(new Forecast (dataToSee.data[i], cityName));
      }
    console.log('city weather', searchQuery);
    // let dataToSend = new Forecast(dataToSee);
    response.send(searchQuery);
    
  }
  catch(error){
    console.log(handleError)
    handleError(error, response);
  }
})

const handleError = (error, response) => {
  response.status(500).send('Something went wrong.')
}


app.get('*', (request, response) => {
  response.send('What you are looking for, doesn\'t exist');
})

class Forecast {
  constructor(citySky, cityName) {
    this.name = cityName;
    this.date = citySky.datetime;
    this.description = citySky.weather.description;


  }
}
//ERRORS
//LISTEN
app.listen(PORT,() => console.log(`LISTENING ON PORT ${PORT}`));''