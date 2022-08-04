'use strict';
const axios =require('axios');
const cache = require ('./cache');

// reference for checking current date https://usefulangle.com/post/187/nodejs-get-date-time
let dateFormat = new Date();

let date = ("0" + dateFormat.getDate()).slice(-2), month = ("0" + (dateFormat.getMonth() + 1)).slice(-2), year = dateFormat.getFullYear(),hours = dateFormat.getHours(),minutes = dateFormat.getMinutes();
let currentDate = `${year}-${month}`;

let dataSaveTime = `${year}-${month}-${date} ${hours}:${minutes}`;

console.log(dataSaveTime);


async function handleWeather(req, res) {

  let searchName = req.query.name.toLowerCase();
  let lat = req.query.lat;
  let lon = req.query.lon;

  if (cache[`${searchName}-weather`] !==undefined && cache[`${searchName}-weather`][0].date.split(':')[0]===currentDate){
    console.log(Date.now());
    res.status(200).send(cache[`${searchName}-weather`]);
  } else {

    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&include=minutely`;
    const weatherTEST = await axios.get(url);
    try {
      const dataArr = weatherTEST.data.data.map(day => new Forecast(day));
      // cache[`${searchName}-weather`] = dataArr;
      cache[`${searchName}-weather`]=dataArr;
      res.status(200).send(cache[`${searchName}-weather`]);
    } catch (err) {
      res.status(500).send('City not found');
    }

  }


}

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
    this.dataSaveDate = dataSaveTime;
  }
}
module.exports = handleWeather;
