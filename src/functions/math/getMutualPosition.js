import issetCoordinates from '../validator/issetCoordinates';
import precisionRound from './precisionRound';

const earthRadius = 6371.0072;

const deg2rad = deg => (deg / 180) * Math.PI;

const rad2deg = rad => (rad / Math.PI) * 180;

const getMutualPosition = (coord1, coord2) => {
  const output = {
    distance: 0,
    azimuth: 0,
  };

  if (
    !issetCoordinates({ latitude: coord1.latitude, longitude: coord1.longitude }) ||
    !issetCoordinates({ latitude: coord2.latitude, longitude: coord2.longitude })
  ) {
    return output;
  }

  // convert coordinates do radians
  const radLatitude1 = deg2rad(coord1.latitude);
  const radLatitude2 = deg2rad(coord2.latitude);
  const radDeltaLongitude = deg2rad(coord2.longitude - coord1.longitude);

  // alghorithms based on:
  // http://cs.wikipedia.org/wiki/Loxodroma
  // http://cs.wikipedia.org/wiki/Ortodroma
  output.distance = Math.acos(
    Math.sin(radLatitude1) *
    Math.sin(radLatitude2) +
    Math.cos(radLatitude1) *
    Math.cos(radLatitude2) *
    Math.cos(radDeltaLongitude),
  ) * earthRadius;

  output.azimuth = rad2deg(Math.atan2(
    Math.sin(radDeltaLongitude) * Math.cos(radLatitude2),
    Math.cos(radLatitude1) *
    Math.sin(radLatitude2) -
    Math.sin(radLatitude1) *
    Math.cos(radLatitude2) *
    Math.cos(radDeltaLongitude),
  ));

  if (output.azimuth < 0) {
    output.azimuth += 360;
  }

  output.distance = precisionRound(output.distance, 2);
  output.azimuth = precisionRound(output.azimuth, 0);

  return output;
};

export default getMutualPosition;
