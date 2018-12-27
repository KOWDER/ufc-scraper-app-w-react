export const FETCH_FIGHTERS_BEGIN = 'FETCH_FIGHTERS_BEGIN';
export const FETCH_FIGHTERS_SUCCESS = 'FETCH_FIGHTERS_SUCCESS';
export const FETCH_FIGHTERS_FAILURE = 'FETCH_FIGHTERS_ERROR';

export const FETCH_NEWS_BEGIN = 'FETCH_NEWS_BEGIN';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_ERROR';

export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';

export const FETCH_FIGHTER_BEGIN = 'FETCH_FIGHTER_BEGIN';
export const FETCH_FIGHTER_SUCCESS = 'FETCH_FIGHTER_SUCCESS';
export const FETCH_FIGHTER_FAILURE = 'FETCH_FIGHTER_ERROR';

export const FETCH_ARTICLE_BEGIN = 'FETCH_ARTICLE_BEGIN';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_ERROR';


/* FETCHING FIGHTERS */

export const fetchFighters = () => {
  return dispatch => {
    dispatch(fetchFightersBegin());

    return fetch("/api/fighters")
      .then(res => res.json())
      .then(fighters => {
        dispatch(fetchFightersSuccess(fighters));
        return fighters
      })
      .catch(err => dispatch(fetchFightersError(err)))
  }
}

export const fetchFightersBegin = () => ({
  type: FETCH_FIGHTERS_BEGIN
})

export const fetchFightersSuccess = fighters => ({
  type: FETCH_FIGHTERS_SUCCESS,
  payload: { fighters }
})

export const fetchFightersError = error => ({
  type: FETCH_FIGHTERS_FAILURE,
  payload: { error }
})




/* FETCHING NEWS */

export const fetchNews = () => {
  return dispatch => {
    dispatch(fetchNewsBegin());

    return fetch("/api/news")
      .then(res => res.json())
      .then(news => {
        dispatch(fetchNewsSuccess(news));
        return news
      })
      .catch(err => dispatch(fetchNewsError(err)))
  }
}

export const fetchNewsBegin = () => ({
  type: FETCH_NEWS_BEGIN
})

export const fetchNewsSuccess = news => ({
  type: FETCH_NEWS_SUCCESS,
  payload: { news }
})

export const fetchNewsError = error => ({
  type: FETCH_NEWS_FAILURE,
  payload: { error }
})



/* HANDLE INPUT BOX */
export const inputBoxChange = val => ({
  type: CHANGE_INPUT_VALUE,
  payload: { val }
})



/* FETCH SPECIFIC FIGHTER PROFILE INFO */
export const fetchFighter = (id) => {
  return dispatch => {
    dispatch(fetchFighterBegin());

    return fetch("/api/fighters/" + id)
      .then(res => res.json())
      .then(fighter => {
        dispatch(fetchFighterSuccess(fighter));
        return fighter
      })
      .catch(err => dispatch(fetchFighterError(err)))
  }
}

export const fetchFighterBegin = () => ({
  type: FETCH_FIGHTER_BEGIN
})

export const fetchFighterSuccess = fighter => ({
  type: FETCH_FIGHTER_SUCCESS,
  payload: { fighter }
})

export const fetchFighterError = error => ({
  type: FETCH_FIGHTER_FAILURE,
  payload: { error }
})



/* FETCH SPECIFIC ARTICLE */
export const fetchArticle = (id) => {
  return dispatch => {
    dispatch(fetchArticleBegin());

    return fetch("/api/news/" + id)
      .then(res => res.json())
      .then(article => {
        dispatch(fetchArticleSuccess(article));
        return article
      })
      .catch(err => dispatch(fetchArticleError(err)))
  }
}

export const fetchArticleBegin = () => ({
  type: FETCH_ARTICLE_BEGIN
})

export const fetchArticleSuccess = article => ({
  type: FETCH_ARTICLE_SUCCESS,
  payload: { article }
})

export const fetchArticleError = error => ({
  type: FETCH_ARTICLE_FAILURE,
  payload: { error }
})
