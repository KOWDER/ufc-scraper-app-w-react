website: [https://ufcify.herokuapp.com/](https://ufcify.herokuapp.com/)

built with React and NodeJS

front-end runs on `localhost:3000`

back-end scrapes content from the [official UFC api](http://ufc-data-api.ufc.com) and stores the data in its own custom one.

front-end fetches from the custom API on `localhost:5000`

endpoints: `localhost:5000/api/fighters/:fighterId`, `localhost:5000/api/news/:newsId`

scraped with [CheerioJS](https://github.com/cheeriojs/cheerio)

back-end uses some caching to avoid repetitive requests

Run `npm run client-install` to install client dependencies.

Run `npm run dev` to run both front & back-end together.

Work in progress :)
