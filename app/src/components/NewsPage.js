import React from 'react';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';

import '../styles/NewsPage.css'

export default ({news, handleClick, loading}) => {
  return (
    <div className="news-page">
      {loading ? <Spinner /> : <NewsList news={news} handleClick={handleClick}/>}
    </div>

  )
}


const NewsList = ({handleClick, news}) => {
  return(
    <div className="news-grid">
      {news.map(article => {
        return (
          <Link to="/article" className="news-article" onClick={handleClick} id={article.id} key={article.id} data-id={article.id}>             
            <img className="article-img" src={article.thumbnail ? article.thumbnail : "https://cdn.lowkickmma.com/wp-content/uploads/2016/05/WerdumMiocic.jpg"} alt=""/>
            <div className="article-content" data-id={article.id}>
              <span className="article-title">{article.title}</span>
              <span className="article-date">{article.date ? new Date(`${article.date}`).toLocaleDateString() : ''}</span>
            </div>   
          </Link>
        )
      })}
    </div>
  )
}