'use strict';
//REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
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

//   try {
//     let cityName = request.query.searchQuery;
//     let lat = request.query.lat;
//     let lon = request.query.lon;
//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
//     let weatherInfo = await axios.get(url);
//     let weatherData = weatherInfo.data.data.map(skies => new Forecast(skies));
//     response.send(weatherData)
//   }
//   catch (error) {
//     console.log(handleError)
//     handleError(error, response);
//   }
// })



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
//     console.log(handleError)
//     handleError(error, response);
//   }
// };

app.get('/movie', getMovie); 

//   try {
//     let movieName = request.query.searchQuery;
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieName}`;
//     let movieData = await axios.get(url);
//     console.log(movieData.data);
//     let filmData = movieData.data.results.map(film => new Movie(film));
//     response.send(filmData);
//     console.log(filmData);
//   }
//   catch (error) {
//     console.log(handleError)
//     handleError(error, response);
//   }

// })


// class Forecast {
//     constructor(skies) {
//       this.date = skies.datetime;
//       this.description = skies.weather.description;


//     }
// }

// class Movie {
//   constructor(film) {
//     this.title = film.title;
//     this.date = film.release_date;
//   }
// }

//ERRORS
const handleError = (error, response) => {
  response.status(500).send('Something went wrong.')
}


app.get('*', (request, response) => {
  response.send('What you are looking for, doesn\'t exist');
})
//LISTEN
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`)); ''