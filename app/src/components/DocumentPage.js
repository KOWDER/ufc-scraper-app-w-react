import React from 'react';
import Spinner from './Spinner';

import '../styles/DocumentPage.css';

export default ({loading, data}) => {
  return (
    <div className="document">
    {loading ? <Spinner /> : data[0] &&
      <div className="document-page">
        <img className="document-img" src={data[0].article.thumbnail ? data[0].article.thumbnail : "https://cdn.lowkickmma.com/wp-content/uploads/2016/05/WerdumMiocic.jpg"} alt="article header"/>
        <div className="document-content" dangerouslySetInnerHTML={{ __html: data[0].article.content ? data[0].article.content : "The API might have problems, visit http://ufc-data-api.ufc.com/api/v3/iphone/"}}></div>
      </div>
    }
    </div>
  )
}
