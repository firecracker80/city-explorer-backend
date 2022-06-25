'use strict';

const axios = require('axios');

let cache = {
  // cache[key] = cache[key].data;
};

async function getMovie (request, response, next){

  try {
    let movieName = request.query.searchQuery;

let key = movieName + 'Data';
console.log(key);
let timeToCache = 1000 * 60 * 60 * 24 * 30;
console.log(timeToCache);
// let testTimeToCache = 1000 * 20;
// console.log(testTimeToCache);
  if(cache[key] && Date.now() - cache[key].timestamp < timeToCache){
    response.send(cache[key].data)
  } else {

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieName}`;
    let movieData = await axios.get(url);
    let filmData = movieData.data.results.map(film => new Movie(film));
    cache[key] = {
      data:filmData,
      timestamp: Date.now()
    }
    response.send(filmData);
  }
  }
  catch (error) {
    handleError(error, response);
    next(error);
  }

};

class Movie {
  constructor(film) {
    this.title = film.title;
    this.date = film.release_date;
    this.overview = film.overview;
    this.src = film.src; 

  }
}

const handleError = (error, response) => {
  response.status(500).send('Something went wrong.')
}

module.exports = getMovie;