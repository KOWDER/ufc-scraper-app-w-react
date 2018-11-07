// import fetch dependency
const fetch = require('node-fetch');

// set default URL path for UFC api
const url = 'http://ufc-data-api.ufc.com/api/v3/iphone';

function getNews() {
  // fetch from the UFC api with the right endpoint
  return fetch(`${url}/news`)
    .then(response => response.json())
    .then(response => {

      // define empty news Array to store all article Objects
      const news = [];
      
      //push an article Object for each element to the news Array
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
      
      // the getNews function returns the entire news Array
      return news;
    })
    .catch(error => console.error('Error:', error));
}

// export the getNews function
module.exports = {
  getNews
};
