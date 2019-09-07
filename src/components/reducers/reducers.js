


const initialState = {
  spxvix: [],
  macrofix: [],
  realTime1: [],
  portfolio: [],
  loading: false,
};
function reducer(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case "SPXVIV":
      return {
        ...state,
        spxvix: action.value
      };
      break;
    case "MACROFIX":
      return {
        ...state,
        macrofix: action.value
      };
      break;
    case "REALTIME1":
      return {
        ...state,
        realTime1: action.value
      };
      break;
    case "PORTFOLIO":
      return {
        ...state,
        portfolio: action.value
      };
      break;
    case "LOADING" :
    return {
      ...state,
      loading: action.value
    }
  }

  return newState;
}
export default reducer;
