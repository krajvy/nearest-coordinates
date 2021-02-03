import dataComplete from './actions/dataComplete';
import preprocessData from './actions/preprocessData';
import readFile from '../functions/file/readFile';
import parseText from '../functions/data/parseText';
import parseCoordinates from '../functions/data/parseCoordinates';
import issetCoordinates from '../functions/validator/issetCoordinates';

import { PREPROCESSDATA, READDATA } from './constants';

const checkCoordinates = coordinates => issetCoordinates(parseCoordinates(coordinates));

const middleware = store => next => action => {
  const state = store.getState();

  switch (action.type) {
  case READDATA:
    if (!state.coordIn || !state.fileIn || !checkCoordinates(state.coordIn)) {
      console.error('Input fields not filled properly!');
      break;
    }
    next(action);
    readFile(state.fileInList)
      .then(data => {
        store.dispatch(preprocessData(data));
      }).catch(error => {
        console.error(error.message);
      });
    break;
  case PREPROCESSDATA:
    parseText(action.payload)
      .then(data => {
        store.dispatch(dataComplete(data));
      }).catch(error => {
        console.error(error.message);
      });
    break;
  default:
    next(action);
  }
};

export default middleware;
