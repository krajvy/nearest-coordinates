import { SETCOORDIN, SETFILEIN, READDATA, DATACOMPLETE } from './constants';

const initialState = {
  coordIn: '',
  fileIn: '',
  fileInList: {},
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SETCOORDIN:
    return {
      ...state,
      coordIn: action.value,
    };
  case SETFILEIN:
    return {
      ...state,
      fileIn: action.value,
      fileInList: action.files,
    };
  case READDATA:
    return {
      ...state,
      isLoading: true,
    };
  case DATACOMPLETE:
    return {
      ...state,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default reducer;
