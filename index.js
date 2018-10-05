const express = require('express');
const cors = require('cors');

const fightersList = require('./fighters');
const fighterScraper = require('./fighter-scraper');
const newsList = require('./news');
const newsScraper = require('./news-scraper');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Scraping is fun!'
  });
});

app.get('/fighters', (req, res) => {
  fightersList.getFighters()
    .then(fighters => {
      res.json(fighters);
    });
});

app.get('/news', (req, res) => {
  newsList.getNews()
    .then(news => {
      res.json(news);
    });
});

app.get('/fighters/:fighterById', (req, res) => {
  fighterScraper.searchFighterById(req.params.fighterById)
    .then(fighter => {
      res.json(fighter);
    });
});

app.get('/news/:newsById', (req, res) => {
  newsScraper.searchNewsById(req.params.newsById)
    .then(news => {
      res.json(news);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on ${port}`)
});