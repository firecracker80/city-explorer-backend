// 'use strict';

// const axios = require('axios');

// async function getWeather (request, response, next){
  
//   try{
//     let cityName = request.query.searchQuery;
    
//     let lat = request.query.lat;
    
//     let lon = request.query.lon;
    
//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
//     let weatherInfo = await axios.get(url);
   
//     let weatherData = weatherInfo.data.data.map(skies => new Forecast(skies));
    
//     response.send(weatherData)
//   }
//   catch(error){
//     handleError(error, response);
//     next(error);
//   }
// };


// class Forecast {
//   constructor(skies) {
//     this.date = skies.datetime;
//     this.description = skies.weather.description;
//   }
// }

// const handleError = (error, response) => {
//   response.status(500).send('Something went wrong.')
// }

// module.exports = getWeather;