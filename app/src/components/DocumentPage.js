import React from 'react';
import Spinner from './Spinner';

import '../styles/DocumentPage.css';

export default ({loading, data}) => {
  return (
    <div className="document-page">
    {loading ? <Spinner /> : data[0] &&
      <div>
        <p className="document-title">{data[0].article.title ? data[0].article.title : "title"}</p>
        <span className="document-date">{data[0].article.date ? data[0].article.date: "date"}</span>
        <img className="document-img" src={data[0].article.thumbnail ? data[0].article.thumbnail : "https://cdn.lowkickmma.com/wp-content/uploads/2016/05/WerdumMiocic.jpg"} alt=""/>
        <p className="document-content">{data[0].article.content ? data[0].article.content: "content"}</p>
      </div>
    }
    </div>
  )
}
