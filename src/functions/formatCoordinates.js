import precisionRound from './precisionRound';

const formatCoordinates = (latitude, longitude) => {
  return precisionRound(latitude, 5) + ',' + precisionRound(longitude, 5);
};

export default formatCoordinates;
