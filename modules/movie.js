'use strict';

const axios = require('axios');

async function getMovie (request, response, next){

  try {
    let movieName = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieName}`;
    let movieData = await axios.get(url);
    let filmData = movieData.data.results.map(film => new Movie(film));
    response.send(filmData);
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
  }
}

module.exports = getMovie;