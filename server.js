'use strict';

require('dotenv').config();
const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

const weatherData = require('./data/weather.json');

const port = process.env.PORT || 3001;



app.get('/weather', (req, res) => {
  console.log(req.query.name);
  let searchName = req.query.name;
  let data = weatherData.find(a=> a.city_name.toLowerCase()===searchName.toLowerCase());
  console.log(data);
  console.log(searchName);
  try{
    const dataArr = data.data.map(day => new Forecast(day));
    res.status(200).send(dataArr);
  } catch(err){
    res.status(500).send('City not found');
  }

});

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}


app.listen(port,() => {
  console.log(`hello from port ${port} `);
});
