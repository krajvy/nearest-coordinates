import dataComplete from './actions/dataComplete';
import preprocessData from './actions/preprocessData';
import readFile from './../functions/readFile';
import preprocessFile from './../functions/preprocessFile';

import { PREPROCESSDATA, READDATA } from './constants';

const middleware = store => next => action => {
  const state = store.getState();

  switch (action.type) {
  case READDATA:
    next(action);
    readFile(state.fileInList)
      .then(data => {
        store.dispatch(preprocessData(data));
      });
    break;
  case PREPROCESSDATA:
    preprocessFile(action.payload)
      .then(data => {
        store.dispatch(dataComplete(data));
      });
    break;
  default:
    next(action);
  }
};

export default middleware;
