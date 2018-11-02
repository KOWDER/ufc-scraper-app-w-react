import React from 'react';

import '../styles/AboutPage.css';

export default () => {
  return (
    <div className="home-page">
      <h1>Welcome to my UFC app</h1>
      <ul>
        <li>Its built with React and NodeJS</li>
        <li>The front-end runs on <code>localhost:3000</code></li>
        <li>The back-end scrapes content from the <a href="http://ufc-data-api.ufc.com/" target="_blank" rel="noopener noreferrer">official UFC api</a> and stores the data in its own custom API.</li>
        <li>React fetches from the custom API on <code>localhost:5000</code></li>
        <li>Scraped with Cheerio.</li>
        <li>Run <code>npm run client-install</code> to install client dependencies.</li>
        <li>Run <code>npm run dev</code> to run both front & back-end together.</li>
        <li>Work in progress :)</li>
      </ul>
    </div>
  )
}
