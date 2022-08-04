'use strict';
const axios = require('axios');
const cache = require ('./cache');

async function handleMovies (req, res){

  let searchMovie = req.query.movieName.toLowerCase();

  if (cache[`${searchMovie}-movies`] !== undefined){
    console.log(cache);
    res.status(200).send(cache[`${searchMovie}-movies`]);
  } else {

    const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchMovie}`;
    const moviesList = await axios.get(moviesUrl);
    console.log(moviesList.data);
    const movieArr = moviesList.data.results.map(day => new MoviesInfo(day));
    cache[`${searchMovie}-movies`] = movieArr;
    try{
      res.send(cache[`${searchMovie}-movies`]);
    } catch(err){
      console.log('Movie not found');
    }
  }
}
class MoviesInfo {
  constructor(movie) {
    this.title = movie.original_title;
    this.date = movie.release_date;
    this.path = movie.poster_path;
    this.des = movie.overview;
    this.rate = movie.vote_average;
  }
}

module.exports = handleMovies;
