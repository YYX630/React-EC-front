export function searchReducer(state = { text: "" }, action) {
  switch (action.type) {
    case "SEARCH_QUERY":
      //update state
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
