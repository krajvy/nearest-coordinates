import dataComplete from './actions/dataComplete';
import preprocessData from './actions/preprocessData';
import readFile from '../functions/file/readFile';
import calculateAllMutualPositions from '../functions/data/calculateAllMutualPositions';
import parseText from '../functions/data/parseText';
import addMapField from '../functions/data/addMapField';
import sortByDistance from '../functions/math/sortByDistance';
import issetCoordinates from '../functions/validator/issetCoordinates';

import { PREPROCESSDATA, READDATA } from './constants';

const checkCoordinates = (coordinates) => issetCoordinates(coordinates);

const middleware = (store) => (next) => (action) => {
  const state = store.getState();

  switch (action.type) {
    case READDATA:
      if (
        !state.coordIn ||
        !state.fileIn ||
        !checkCoordinates(state.coordInParsed)
      ) {
        console.error('Input fields not filled properly!');
        break;
      }
      next(action);
      readFile(state.fileInList)
        .then((data) => {
          store.dispatch(preprocessData(data));
        })
        .catch((error) => {
          console.error(error.message);
        });
      break;
    case PREPROCESSDATA:
      parseText(action.payload)
        .then((data) => {
          data = calculateAllMutualPositions(state.coordInParsed, data);
          data = sortByDistance(data);
          data = addMapField(data);
          store.dispatch(dataComplete(data));
        })
        .catch((error) => {
          console.error(error.message);
        });
      break;
    default:
      next(action);
  }
};

export default middleware;
