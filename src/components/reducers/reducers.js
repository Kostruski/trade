const initialState = {
  spxvix: [],
  macrofix: [],
  realTime1: [],
  protfolio: []
};
function reducer(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case "SPXVIV":
      return {
        ...state,
        spxvix: [...state.spxvix, ...action.spxvix]
      };
      break;
    case "MACROFIX":
      return {
        ...state,
        macrofix: [...state.macrofix, ...action.macrofix]
      };
      break;
    case "REALTIME1":
      return {
        ...state,
        realTime1: [...state.realTime1, ...action.realTime1]
      };
      break;
    case "PORTFOLIO":
      return {
        ...state,
        portfolio: [...state.portfolio, ...action.portfolio]
      };
  }

  return newState;
}
export default reducer;
