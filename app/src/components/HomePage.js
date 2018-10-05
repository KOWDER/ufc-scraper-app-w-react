import React from 'react';

import '../styles/HomePage.css';

export default () => {
  return (
    <div className="home-page">
      <h1>Welcome to my UFC application</h1>
      <ul>
        <li>built with React and NodeJS</li>
        <li>front-end runs on localhost:3000</li>
        <li>back-end scrapes content from the <a href="http://ufc-data-api.ufc.com/" target="_blank" rel="noopener noreferrer">official UFC api</a> and stores the data in its own custom API.</li>
        <li>front-end fetches from the custom API on localhost:5000</li>
        <li>scraped with Cheerio</li>
        <li>back-end uses caching to avoid repetitive requests</li>
        <li>Run <strong>'npm run client-install'</strong>' to install client dependencies.</li>
        <li>Run <strong>'npm run dev'</strong> to run both front & back-end together.</li>
      </ul>
    </div>
  )
}
