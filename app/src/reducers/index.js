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
  const newState = {...state};

  switch (action.type) {

    case 'ADD':
      return {
        ...newState,
        add: ++newState.add
      }

    default:
      return newState
  }
}