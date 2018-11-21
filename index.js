// import dependencies
const express = require('express');
const cors = require('cors');

const path = require('path');

// import API objects
const fightersList = require('./fighters');
const fighterScraper = require('./fighter-scraper');
const newsList = require('./news');
const newsScraper = require('./news-scraper');


// initialize server
const app = express();
app.use(cors());

// set default route
app.get('/', (req, res) => {
  res.json({
    message: 'Scraping is fun!'
  });
});

// set route for the fighters object
app.get('/fighters', (req, res) => {
  fightersList.getFighters()
    .then(fighters => {
      res.json(fighters);
    });
});

// set route for the news object
app.get('/news', (req, res) => {
  newsList.getNews()
    .then(news => {
      res.json(news);
    });
});

// set route for individual fighter by their ID
app.get('/fighters/:fighterById', (req, res) => {
  fighterScraper.searchFighterById(req.params.fighterById)
    .then(fighter => {
      res.json(fighter);
    });
});

// set route for individual news by their ID
app.get('/news/:newsById', (req, res) => {
  newsScraper.searchNewsById(req.params.newsById)
    .then(news => {
      res.json(news);
    });
});

// define port on which the back-end server runs
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'app/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'app/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Listening on ${port}`)
});