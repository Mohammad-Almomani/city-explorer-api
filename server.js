'use strict';

require('dotenv').config();
const express = require("express");
const cors = require('cors');
const axios = require("axios");
const app = express();
app.use(cors());
const handleWeather = require('./Modules/weather');
const handleMovies = require('./Modules/movies');

const port = process.env.PORT || 3001; 
app.get('/weather', handleWeather);

app.get('/movies', handleMovies);

app.listen(port,() => {
  console.log(`hello from port ${port} `);
});
