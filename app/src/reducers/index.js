const initialState = {
  loading: false,
  fighting: {
    inputBox: '',
    fighters: [],
    profile: []
  },
  news: [],
  doc: [],
  add: 0
}

export default (state = initialState, action) => {

  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        add: ++state.add
      }

    default:
      return state
  }
}