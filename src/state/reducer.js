import {
  SETCOORDIN,
  SETFILEIN,
  READDATA,
  DATACOMPLETE,
  SETDISPLAYONMAP,
  SETMAPDISTANCE,
  SETDISPLAYONMAPBYDISTANCE,
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
  case SETDISPLAYONMAPBYDISTANCE:
    return {
      ...state,
      data: state.data.map(row => {
        row.displayOnMap = row.distance <= state.mapDistance;
        return row;
      }),
    };
  case SETMAPDISTANCE:
    return {
      ...state,
      mapDistance: parseInt(action.value || 0, 10),
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
