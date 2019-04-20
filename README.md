:exclamation: **As of January 2019, the [UFC API](http://ufc-data-api.ufc.com/api/v3/iphone) is down** :exclamation:

## 1. About
UFCify is an application that displays informations on the UFC world. [Live Demo Here](https://ufcify.herokuapp.com/)

- The back-end is built on Node, and scrapes data from the official UFC API with [Cheerio](https://github.com/cheeriojs/cheerio]).
- The React front-end fetches that data locally from back-end endpoints.
- The state is managed with [Redux](https://github.com/reduxjs/redux).


## 2. Installation
-  `npm install`to install back-end dependencies.
-  `npm run client-install` to install front-end dependencies.

## 3. Usage
- `npm run dev` to run the app (back + front concurrently) locally.
- the app allows you to :
	- read the latest news the UFC posted
	- search for fighter informations

*The app is a living project, it might be subject to changes for learning purposes*:innocent:
