import dataComplete from './actions/dataComplete';
import readFile from './../functions/readFile';

import { READDATA } from './constants';

const middleware = store => next => action => {
  const state = store.getState();

  switch (action.type) {
  case READDATA:
    next(action);
    readFile(state.fileInList)
      .then(data => {
        store.dispatch(dataComplete(data));
      });
    break;
  default:
    next(action);
  }
};

export default middleware;
