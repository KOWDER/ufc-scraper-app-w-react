import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/NewsPage.css'

export default ({data, handleClick}) => {
  return (
    <div className="news-page">
      <div className="news-grid">
        {data.articles.map(article => {
          return <Link to="/article" className="news-article" onClick={handleClick} id={article.id} key={article.id}>
            <img className="article-img" src={article.thumbnail ? article.thumbnail : "https://cdn.lowkickmma.com/wp-content/uploads/2016/05/WerdumMiocic.jpg"} alt=""/>
            <div className="article-content">
              <span className="article-title">{article.title}</span>
              <br/>
              <span className="article-date">{article.date ? new Date(`${article.date}`).toLocaleDateString() : ''}</span>
            </div>
          </Link>
        })}
      </div>
    </div>

  )
}
