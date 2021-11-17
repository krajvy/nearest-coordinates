import {
  SETCOORDIN,
  SETFILEIN,
  READDATA,
  DATACOMPLETE,
  SETDISPLAYONMAP,
  SETMAPDISTANCE,
  SETDISPLAYONMAPBYDISTANCE,
  ERROROCCURED,
} from './constants';

import parseCoordinates from '../functions/data/parseCoordinates';

const initialState = {
  coordIn: '',
  coordInParsed: {},
  fileIn: '',
  filesInList: {},
  isLoading: false,
  data: [],
  mapDistance: 50,
  errorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETCOORDIN:
      return {
        ...state,
        coordIn: action.value,
        coordInParsed: parseCoordinates(action.value),
      };
    case SETFILEIN:
      return {
        ...state,
        fileIn: action.value,
        filesInList: action.files,
      };
    case SETDISPLAYONMAP:
      return {
        ...state,
        data: state.data.map((row, index) => {
          if (index === action.index) {
            row.displayOnMap = !row.displayOnMap;
          }
          return row;
        }),
      };
    case SETDISPLAYONMAPBYDISTANCE:
      return {
        ...state,
        data: state.data.map((row) => {
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
        data: [],
      };
    case DATACOMPLETE:
      return {
        ...state,
        isLoading: false,
        data: action.value,
      };
    case ERROROCCURED:
      console.error(action.payload);
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
