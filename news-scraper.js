const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'http://ufc-data-api.ufc.com/api/v3/iphone/news/';

//init cache
const articlesCache = {};

function searchNewsById(newsId) {

  //if object found in cache, serve it from the cache
  if(articlesCache[newsId]) {
    console.log('serving from cache', newsId);
    return Promise.resolve(articlesCache[newsId]);
  }

  return fetch(`${url}${newsId}`)
    .then(response => response.text())
    .then(body => {

      const newsProfile = [];
      const $ = cheerio.load(body);

      const $thumbnail = $('.news-detail .news-image').attr('src');
      const $title = $('.detail-wrapper-inner h1 span').text();
      const $date = $('.detail-wrapper-inner h5').text();
      const $content = $('.detail-wrapper-inner div').text();

      const article = {
        thumbnail: $thumbnail,
        title: $title,
        date: $date,
        content: $content
      }

      newsProfile.push({ article });

      //pass the objects to the cache
      articlesCache[newsId] = newsProfile;

      return newsProfile;
    })
    .catch(error => console.error('Error:', error));
}

module.exports = {
  searchNewsById
};