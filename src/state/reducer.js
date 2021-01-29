import { SETCOORDIN, SETFILEIN, READDATA } from './constants';

import readFile from '../functions/readFile';

const initialState = {
  coordIn: '',
  fileIn: '',
  fileInList: {},
  loading: false,
};

function reducer (state = initialState, action) {
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
    state.loading = true;
    readFile(state.fileInList)
      .then(data => {
        console.log(data, state);
      })
      .catch(error => {
        console.error(error, state);
      }).finally(() => {
        state.loading = false;
      });
    console.log('READDATA', state, action);
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default reducer;
