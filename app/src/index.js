import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import './index.css';
import App from './components/App';


const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV !== 'production' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

