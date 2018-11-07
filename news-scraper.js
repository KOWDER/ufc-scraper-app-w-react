// import dependencies
const fetch = require('node-fetch');
const cheerio = require('cheerio');

// UFC API generic path
const url = 'http://ufc-data-api.ufc.com/api/v3/iphone/news/';

//initialize cache Object
const articlesCache = {};

function searchNewsById(newsId) {

  // articles are stored in the articlesCache Object by their IDS
  // if the ID passed to the function corresponds to one of them
  // the function will serve the article stored in the cache.
  if(articlesCache[newsId]) {
    console.log('serving from cache', newsId);
    return Promise.resolve(articlesCache[newsId]);
  }

  return fetch(`${url}${newsId}`)
    .then(response => response.text())
    .then(body => {

      // initialize news Array
      const newsProfile = [];

      // set Cheerio to $
      const $ = cheerio.load(body);

      // scrape the page  with Cheerio
      const $thumbnail = $('.news-detail .news-image').attr('src');
      const $title = $('.detail-wrapper-inner h1 span').text();
      const $date = $('.detail-wrapper-inner h5').text();
      const $content = $('.detail-wrapper-inner').html();

      // pass scrapped content into an article Object
      const article = {
        thumbnail: $thumbnail,
        title: $title,
        date: $date,
        content: $content
      }

      // article Object pushed into the newsProfile Array
      newsProfile.push({ article });

      // pass the Array to the cache in case the user searches for it again
      // to avoid another scraping cycle
      articlesCache[newsId] = newsProfile;

      // returns the newsProfile Array
      return newsProfile;
    })
    .catch(error => console.error('Error:', error));
}

module.exports = {
  searchNewsById
};