import {
  FETCH_FIGHTERS_BEGIN,
  FETCH_FIGHTERS_SUCCESS,
  FETCH_FIGHTERS_FAILURE,
  FETCH_NEWS_BEGIN,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
  CHANGE_INPUT_VALUE,
  FETCH_FIGHTER_BEGIN,
  FETCH_FIGHTER_SUCCESS,
  FETCH_FIGHTER_FAILURE,
  FETCH_ARTICLE_BEGIN,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  inputBox: '',
  fighters: [],
  profile: [],
  news: [],
  doc: [],
  add: 0,
  error: null
}

export default (state = initialState, action) => {

  switch (action.type) {

    /* FETCH FIGHTERS*/
    case FETCH_FIGHTERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_FIGHTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        fighters: action.payload.fighters
      }
    
    case FETCH_FIGHTERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    /* FETCH NEWS */
    case FETCH_NEWS_BEGIN:
    return {
      ...state,
      loading: true,
      error: null
    }

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        news: action.payload.news
      }
    
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    
    /* CHANGE INPUT VALUE */
    case CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputBox: action.payload.val
      }

    
    /* FETCH SPECIFIC FIGHTER INFO */
    case FETCH_FIGHTER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    
    case FETCH_FIGHTER_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload.fighter
      }
        
    case FETCH_FIGHTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }


    /* FETCH SPECIFIC ARTICLE */
    case FETCH_ARTICLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
  
    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        doc: action.payload.article
      }
        
    case FETCH_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    default:
      return state
  }
}