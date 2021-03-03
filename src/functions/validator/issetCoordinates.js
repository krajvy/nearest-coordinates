const verifyValue = (value) =>
  typeof value !== 'undefined' && value !== null && value !== '';

const issetCoordinates = (coord) =>
  verifyValue(coord.latitude) && verifyValue(coord.longitude);

export default issetCoordinates;
