'use strict';

const axios = require('axios');

app.get('/movie', async (request, response) => {
  let movieName = request.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${movieName}`;
  let movieData = await axios.get(url);
  let filmData = movieData.results.map(films => new Movie(films));
    response.send(filmData);

};

class Movie {
  constructor(films) {
    this.title = films.results.title;
    this.date = films.results.release_date;
  }
}