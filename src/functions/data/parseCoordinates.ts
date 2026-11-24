import type { CoordinatsWithDescription } from '@/types';

import areCoordinatesValid from '@/functions/validator/areCoordinatesValid';

const getDescription = (coordinates: CoordinatsWithDescription, line: string): string => {
  if (areCoordinatesValid(coordinates)) {
    return line;
  }
  return '';
};

const degMinSec2float = (degrees: string | number, minutes: string | number, seconds: string | number): number => {
  return (
    parseFloat(degrees as unknown as string) +
    parseFloat(minutes as unknown as string) / 60 +
    parseFloat(seconds as unknown as string) / 60 / 60
  );
};

const parseCoordinates = (input: string): CoordinatsWithDescription => {
  const output: CoordinatsWithDescription = {
    latitude: null,
    longitude: null,
    description: '',
  };
  let search;

  input = input.trim();
  if (!input) {
    return output;
  }

  // 17.15451°E,50.33167°N ; 50.0950228N, 16.5538242E
  search = input.match(
    /[^\d-]*(\d+(\.\d+)?)°?([ewns])\s?,\s?(\d+(\.\d+)?)°?([ewns])\D*/i,
  );
  if (search) {
    const directionOne = search[6]?.toLowerCase();
    const directionTwo = search[3]?.toLowerCase();
    const coordinatesOne = search[1];
    const coordinatesTwo = search[4];

    switch (`${directionOne}${directionTwo}`) {
      case 'en':
        output.longitude = parseFloat(`${coordinatesTwo}`);
        output.latitude = parseFloat(`${coordinatesOne}`);
        break;
      case 'es':
        output.longitude = parseFloat(`${coordinatesTwo}`);
        output.latitude = parseFloat(`-${coordinatesOne}`);
        break;
      case 'wn':
        output.longitude = parseFloat(`-${coordinatesTwo}`);
        output.latitude = parseFloat(`${coordinatesOne}`);
        break;
      case 'ws':
        output.longitude = parseFloat(`-${coordinatesTwo}`);
        output.latitude = parseFloat(`-${coordinatesOne}`);
        break;
      case 'ne':
        output.longitude = parseFloat(`${coordinatesOne}`);
        output.latitude = parseFloat(`${coordinatesTwo}`);
        break;
      case 'nw':
        output.longitude = parseFloat(`${coordinatesOne}`);
        output.latitude = parseFloat(`-${coordinatesTwo}`);
        break;
      case 'se':
        output.longitude = parseFloat(`-${coordinatesOne}`);
        output.latitude = parseFloat(`${coordinatesTwo}`);
        break;
      case 'sw':
        output.longitude = parseFloat(`-${coordinatesOne}`);
        output.latitude = parseFloat(`-${coordinatesTwo}`);
        break;
    }

    output.description = getDescription(output, input);

    return output;
  }

  // 49°33'46.745"N, 16°54'28.788"E
  search = input.match(
    /[^\d-]*((\d+)°?((\d+)'?)?((\d+\.\d+)"?)?)([ewns])\s?[,/]?\s?((\d+)°?((\d+)'?)?((\d+\.\d+)"?)?)([ewns])\D*/i,
  );
  if (search) {
    const direction = search[7]?.toLowerCase();
    const degreesOne = search[2] as string;
    const minutesOne = search[4] as string;
    const secondsOne = search[6] as string;
    const degreesTwo = search[9] as string;
    const minutesTwo = search[11] as string;
    const secondsTwo = search[13] as string;

    if (direction === 'e' || direction === 'w') {
      output.latitude = degMinSec2float(degreesTwo, minutesTwo, secondsTwo);
      output.longitude = degMinSec2float(degreesOne, minutesOne, secondsOne);
    } else {
      output.latitude = degMinSec2float(degreesOne, minutesOne, secondsOne);
      output.longitude = degMinSec2float(degreesTwo, minutesTwo, secondsTwo );
    }

    output.description = getDescription(output, input);

    return output;
  }

  // N 50°45.65197', E 15°3.19075'
  search = input.match(
    /[^\d-]*([ewns])\s+((\d+)°?((\d+\.\d+)'?)?)\s?[,/]?\s?([ewns])\s+((\d+)°?((\d+\.\d+)'?)?)\D*/i,
  );
  if (search) {
    const direction = search[1]?.toLowerCase();
    const degreesOne = search[3] as string;
    const minutesOne = search[5] as string;
    const degreesTwo = search[8] as string;
    const minutesTwo = search[10] as string;

    if (direction === 'e' || direction === 'w') {
      output.latitude = degMinSec2float(degreesTwo, minutesTwo, 0);
      output.longitude = degMinSec2float(degreesOne, minutesOne, 0);
    } else {
      output.latitude = degMinSec2float(degreesOne, minutesOne, 0);
      output.longitude = degMinSec2float(degreesTwo, minutesTwo, 0);
    }

    output.description = getDescription(output, input);

    return output;
  }

  // 27.449486,-13.050728
  search = input.match(
    /[^\d-]*(-?\d+(\.\d+)?)[^ewns]\s?,\s?(-?\d+(\.\d+)?)[^ewns]\D*/i,
  );
  if (search) {
    output.latitude = parseFloat(search[1] || '0');
    output.longitude = parseFloat(search[3] || '0');
    output.description = getDescription(output, input);

    return output;
  }

  return output;
};

export { getDescription, degMinSec2float };
export default parseCoordinates;
