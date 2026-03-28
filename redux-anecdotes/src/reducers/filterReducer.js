export const changeFilter = filter => {
  return({
      type: 'SET_FILTER',
      search: filter
  })
}

const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.search
    default:
      return state
  }
}

export default filterReducer