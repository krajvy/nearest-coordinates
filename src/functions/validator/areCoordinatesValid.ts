import type { Coordinates, LatLon } from "@/types";

const verifyValue = (value: LatLon): boolean =>
  typeof value !== 'undefined' && value !== null && value !== '';

const areCoordinatesValid = (coord: Coordinates): boolean =>
  verifyValue(coord.latitude) && verifyValue(coord.longitude);

export default areCoordinatesValid;
