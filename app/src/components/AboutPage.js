import React from 'react';

import '../styles/AboutPage.css';

export default () => {
  return (
    <div className="home-page">
      <h3>General informations:</h3>
      <ul>
        <li>Its built with React and NodeJS</li>
        <li>The front-end runs on <code>localhost:3000</code></li>
        <li>The back-end scrapes content from the <a href="http://ufc-data-api.ufc.com/" target="_blank" rel="noopener noreferrer">official UFC api</a> and stores the data in its own custom API</li>
        <li>React fetches from the custom API on <code>localhost:5000</code></li>
        <li>Scraped with <a href="https://github.com/cheeriojs/cheerio" target="_blank" rel="noopener noreferrer">cheeriojs</a></li>
        <li>Run <code>npm run client-install</code> to install client dependencies</li>
        <li>Run <code>npm run dev</code> to run both front & back-end together</li>
        <li>Implemented with Redux</li>
        <li>Build for learning purposes</li>
        <li>Work in progress :)</li>
        <li>Open source code available on <a href="https://github.com/kevscript/ufc-scraper-app-w-react" target="_blank" rel="noopener noreferrer">Github</a></li>
      </ul>
    </div>
  )
}
