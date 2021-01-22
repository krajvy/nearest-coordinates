const NCReducer = (state, action) => {
  switch (action.type) {
  case 'SETCOORDIN':
    return { ...state, coordIn: action.value };
  case 'SETFILEIN':
    return { ...state, fileIn: action.value };
  default:
    return state;
  }
};

export default NCReducer;
