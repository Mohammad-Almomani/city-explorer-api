'use strict';

require('dotenv').config();
const express = require("express");
const cors = require('cors');
const axios = require("axios");
const app = express();
app.use(cors());

// const weatherData = require('./data/weather.json');

const port = process.env.PORT || 3001;



  


 const handleSearch = async(req, res) => {
  let searchName = req.query.name;
  let lat = req.query.lat; //-78.6382
  let lon = req.query.lon; //35.7796
  const url = ` https://api.weatherbit.io/v2.0/current?lat=${lon}&lon=${lat}&key=${process.env.WEATHER_API_KEY}&include=minutely`;
  const weatherTEST = await axios.get(url);

  console.log(weatherTEST.data.data)

  try{
    const dataArr = weatherTEST.data.data.map(day => new Forecast(day));
    res.status(200).send(dataArr);
  } catch(err){
    res.status(500).send('City not found');
  }

}

app.get('/weather', handleSearch);


const handleMovies = async(req, res) => {
  let searchMovie = req.query.movieName;
  const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchMovie}`;
  

  const moviesList = await axios.get(moviesUrl);

  console.log(moviesList.data)

  const movieArr = moviesList.data.results.map(day => new MoviesInfo(day));

  try{
    res.send(movieArr)
    // res.send(moviesList)
    // const dataArr = weatherTEST.data.data.map(day => new Forecast(day));
    // res.status(200).send(dataArr);
  } catch(err){
    // res.status(500).send('Movie not found');
  }

}

app.get('/movies', handleMovies);

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

class MoviesInfo {
  constructor(movie) {
    this.title = movie.original_title;
    this.date = movie.release_date;
    this.path = movie.poster_path;
    this.des = movie.overview;
    this.rate = movie.vote_average
  }
}


app.listen(port,() => {
  console.log(`hello from port ${port} `);
});
