//Node Libraries
const express = require('express');
const path = require('path');

//NPM Libraries
const axios = require('axios');
const hbs = require('hbs');
require('dotenv').config();

//Imported JavaScript
const getLocation = require('./functions/getLocation');
const grabCurrentWeather = require('./functions/grabCurrentWeather');

const app = express();

//Paths for Express Config
const publicAssets = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicAssets));

app.get('', (req, res) => {
  res.render('index', {
    title: 'NodeJS Weather App',
    name: 'Mitchell Ramsey'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mitchell Ramsey'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Mitchell Ramsey',
    message: 'Use this page to help answer any questions you may have.'
  });
});

app.get('/help/*', (req,res) => {
  res.render('pageNotFound', {
    title: 'Page Not Found',
    name: 'Mitchell Ramsey',
    message: 'Help article not found.'
  })
})

app.get('/weather', async (req, res) => {
  try{
    if(!req.query.address) throw new Error('Must provide address');
    const locationQuery = req.query.address;

    const locResponse = await getLocation( locationQuery, process.env.MAPBOX_API_KEY, axios);
    if(!locResponse.data || locResponse.data.features.length === 0) throw new Error('City not found');
    const coordinates = locResponse.data.features[0].center;

    const weather = await grabCurrentWeather(process.env.WEATHERSTACK_API_KEY, coordinates, axios);
    if(weather.data.error) throw new Error('Weather Error');
    const { location, current } =  weather.data;

    res.send({
      location,
      current,
    });

  } catch(err){
      res.send({
        error: 400,
        message: err.message
      });
  }
});



app.get('*', (req, res) => {
  res.render('pageNotFound', {
    title: 'Page Not Found',
    name: 'Mitchell Ramsey',
    message: 'Page not found -- Please go click on one of the links above to go back.'
  })
})

app.listen(8080, () => {
  console.log('Listening at server 8080');
})