const axios =require('axios');

async function handleWeather(req, res) {

  let {searchName, lat, lon} = req.query;
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&include=minutely`;
  const weatherTEST = await axios.get(url);

  console.log(weatherTEST.data.data);
  try {
    const dataArr = weatherTEST.data.data.map(day => new Forecast(day));
    console.log(`I am working`);
    res.status(200).send(dataArr);
  } catch (err) {
    res.status(500).send('City not found');
  }

}

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}
module.exports = handleWeather;
