import issetCoordinates from './validator/issetCoordinates';

const getDescription = (coordinates, line) => {
  // As description, lets have whole line with coordinates
  // Everything else is just balast
  if (issetCoordinates(coordinates)) {
    return line;
  }
  return '';
};

const degMinSec2float = (degrees, minutes, seconds) => {
  return parseFloat(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / 60 / 60;
};

const parseCoordinates = input => {
  const output = {
    latitude: undefined,
    longitude: undefined,
    description: '',
  };
  let search;

  input = input.trim();
  if (!input) {
    return output;
  }

  // lets parse some coordinates

  // 17.15451°E,50.33167°N ; 50.0950228N, 16.5538242E
  search = input.match(/[^\d-]*(\d+(\.\d+)?)°?([ewns])\s?,\s?(\d+(\.\d+)?)°?([ewns])\D*/i);
  if (search) {
    const first = search[6].toLowerCase();
    const second = search[3].toLowerCase();
    switch (first + second) {
    case 'en':
      output.longitude = parseFloat(search[4]);
      output.latitude = parseFloat(search[1]);
      break;
    case 'es':
      output.longitude = parseFloat(search[4]);
      output.latitude = parseFloat(-search[1]);
      break;
    case 'wn':
      output.longitude = parseFloat(-search[4]);
      output.latitude = parseFloat(search[1]);
      break;
    case 'ws':
      output.longitude = parseFloat(-search[4]);
      output.latitude = parseFloat(-search[1]);
      break;
    case 'ne':
      output.longitude = parseFloat(search[1]);
      output.latitude = parseFloat(search[4]);
      break;
    case 'nw':
      output.longitude = parseFloat(search[1]);
      output.latitude = parseFloat(-search[4]);
      break;
    case 'se':
      output.longitude = parseFloat(-search[1]);
      output.latitude = parseFloat(search[4]);
      break;
    case 'sw':
      output.longitude = parseFloat(-search[1]);
      output.latitude = parseFloat(-search[4]);
      break;
    }
    output.description = getDescription(output, input);
    return output;
  }

  // 49°33'46.745"N, 16°54'28.788"E
  search = input.match(/[^\d-]*((\d+)°?((\d+)'?)?((\d+\.\d+)"?)?)([ewns])\s?[,/]?\s?((\d+)°?((\d+)'?)?((\d+\.\d+)"?)?)([ewns])\D*/i);
  if (search) {
    const pos = search[7].toLowerCase();
    if (pos === 'e' || pos === 'w') {
      output.latitude = degMinSec2float(search[9], search[11], search[13]);
      output.longitude = degMinSec2float(search[2], search[4], search[6]);
    } else {
      output.latitude = degMinSec2float(search[2], search[4], search[6]);
      output.longitude = degMinSec2float(search[9], search[11], search[13]);
    }
    output.description = getDescription(output, input);
    return output;
  }

  // N 50°45.65197', E 15°3.19075'
  search = input.match(/[^\d-]*([ewns])\s+((\d+)°?((\d+\.\d+)'?)?)\s?[,/]?\s?([ewns])\s+((\d+)°?((\d+\.\d+)'?)?)\D*/i);
  if (search) {
    const pos = search[1].toLowerCase();
    if (pos === 'e' || pos === 'w') {
      output.latitude = degMinSec2float(search[8], search[10], 0);
      output.longitude = degMinSec2float(search[3], search[5], 0);
    } else {
      output.latitude = degMinSec2float(search[3], search[5], 0);
      output.longitude = degMinSec2float(search[8], search[10], 0);
    }
    output.description = getDescription(output, input);
    return output;
  }

  // 27.449486,-13.050728
  search = input.match(/[^\d-]*(-?\d+(\.\d+)?)[^ewns]\s?,\s?(-?\d+(\.\d+)?)[^ewns]\D*/i);
  if (search) {
    output.latitude = parseFloat(search[1]);
    output.longitude = parseFloat(search[3]);
    output.description = getDescription(output, input);
    return output;
  }

  return output;
};

export {
  getDescription,
  degMinSec2float,
};
export default parseCoordinates;
