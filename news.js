const fetch = require('node-fetch');

const url = 'http://ufc-data-api.ufc.com/api/v3/iphone';

function getNews() {
  return fetch(`${url}/news`)
    .then(response => response.json())
    .then(response => {

      const news = [];
      
      //make object for every fighter in the api
      response.forEach(el => {
        const article = {
          date: el.article_date,
          id: el.id,
          thumbnail: el.thumbnail,
          title: el.title,
          author: el.author,
          urlName: el.url_name
        };
        news.push(article);
      });
  
      return news;
    })
    .catch(error => console.error('Error:', error));
}

module.exports = {
  getNews
};
