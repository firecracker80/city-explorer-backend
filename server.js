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

app.get('/city', async (request, response) => {
  
  try{
    console.log(request.query);
    let cityName = request.query.searchQuery.toLowerCase();
    console.log(cityName);
    // let dataToSee = data.find(weather => weather.city_name.toLowerCase() === cityName)
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${cityFind.data[0].lat}&lon=${cityFind.data[0].lon}`;
    let weatherInfo = await axios.get(url);
    let weatherData = weatherInfo.data.weather.map(skies => new Forecast(skies));
    respond.send(weatherData)

    // let searchQuery = [];
    // for(let i=0; i<dataToSee.data.length; i++){
    //     console.log(dataToSee.data[i]);
    //     searchQuery.push(new Forecast (dataToSee.data[i], cityName));
    //   }
    // console.log('city weather', searchQuery);
    // // let dataToSend = new Forecast(dataToSee);
    // response.send(searchQuery);
    
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
  constructor(skies) {
    // this.name = cityName;
    this.date = skies.datetime;
    this.description = skies.weather.description;


  }
}
//ERRORS
//LISTEN
app.listen(PORT,() => console.log(`LISTENING ON PORT ${PORT}`));''