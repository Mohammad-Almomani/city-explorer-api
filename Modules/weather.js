'use strict';
const axios =require('axios');
const weatherCache = {};


// reference for checking current date https://usefulangle.com/post/187/nodejs-get-date-time
let dateFormat = new Date();

let date = ("0" + dateFormat.getDate()).slice(-2), month = ("0" + (dateFormat.getMonth() + 1)).slice(-2), year = dateFormat.getFullYear();
let currentDate = `${year}-${month}-${date}`;


async function handleWeather(req, res) {

  let searchName = req.query.name.toLowerCase();
  let lat = req.query.lat;
  let lon = req.query.lon;

  if (weatherCache[searchName] !==undefined && weatherCache[searchName][0].date.split(':')[0]===currentDate){
    res.status(200).send(weatherCache[searchName]);
  } else {

    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&include=minutely`;
    const weatherTEST = await axios.get(url);
    try {
      const dataArr = weatherTEST.data.data.map(day => new Forecast(day));
      weatherCache[searchName] = dataArr;
      console.log(`I am working`);
      res.status(200).send(dataArr);
    } catch (err) {
      res.status(500).send('City not found');
    }

  }


}

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}
module.exports = handleWeather;
