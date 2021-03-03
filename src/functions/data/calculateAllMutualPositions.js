import getMutualPosition from '../math/getMutualPosition';
import issetCoordinates from '../validator/issetCoordinates';

const calculateAllMutualPositions = (coords, data) => {
  let output = [];

  if (!issetCoordinates(coords) || !data.length) {
    return output;
  }

  output = data.map((row) => {
    const mutual = getMutualPosition(coords, {
      latitude: row.latitude,
      longitude: row.longitude,
    });
    row.distance = mutual.distance;
    row.azimuth = mutual.azimuth;
    return row;
  });

  return output;
};

export default calculateAllMutualPositions;
