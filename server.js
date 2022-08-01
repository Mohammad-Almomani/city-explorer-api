
const express = require("express");

require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
const weatherData = require('./data/weather.json')

const port = process.env.PORT || 3001;

let data =[];

app.get('/weather', (req, res) => {
    console.log(req.query.name)
    let x = weatherData.find(a=> a.city_name==req.query.name)
    console.log(x)
    data.push(x)
    res.json({'data': data})
})

app.get('/', (req,res) => {
    const newBook = req.params
    data = newBook
    console.log(req.body)
    res.send(req.params)
})

app.listen(port,() => {
    console.log(`hello from port ${port} `)
})