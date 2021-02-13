import {
  SETCOORDIN,
  SETFILEIN,
  READDATA,
  DATACOMPLETE,
  SETDISPLAYONMAP,
  SETMAPDISTANCE,
} from './constants';

const initialState = {
  coordIn: '',
  fileIn: '',
  fileInList: {},
  isLoading: false,
  data: [],
  mapDistance: 50,
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
  case SETDISPLAYONMAP:
    state.data[action.index].displayOnMap = !state.data[action.index].displayOnMap;
    return {
      ...state,
    };
  case SETMAPDISTANCE:
    return {
      ...state,
      mapDistance: action.value,
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
      data: action.value,
    };
  default:
    return state;
  }
};

export default reducer;
