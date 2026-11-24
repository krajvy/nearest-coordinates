import precisionRound from '@/functions/math/precisionRound';

const formatCoordinates = (latitude: number, longitude: number): string => {
  return precisionRound(latitude, 5) + ',' + precisionRound(longitude, 5);
};

export default formatCoordinates;
