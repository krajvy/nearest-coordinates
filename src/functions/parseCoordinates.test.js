import parseCoordinates, { getDescription, degMinSec2float } from './parseCoordinates';

/* globals test, expect */

// getDescription tests
test('Should return description line, when there are coordinates', () => {
  const coords = {
    latitude: 123456,
    longitude: 123456,
  };
  const line = 'Some line with coords';
  const ret = getDescription(coords, line);
  expect(ret).toEqual('Some line with coords');
});

test('Should return empty line, when there are no coordinates', () => {
  const coords = {
    latitude: undefined,
    longitude: undefined,
  };
  const line = 'Some line without coords';
  const ret = getDescription(coords, line);
  expect(ret).toEqual('');
});

// degMinSec2float tests
test('Should calculate correct float number from degrees, minutes and seconds', () => {
  const coords = [
    {
      degrees: 50,
      minutes: 4,
      seconds: 13,
      output: 50.07027777777778,
    },
    {
      degrees: -27,
      minutes: 44,
      seconds: 23,
      output: -26.260277777777777,
    },
    {
      degrees: 176,
      minutes: -55,
      seconds: 3,
      output: 175.08416666666668,
    },
    {
      degrees: -72,
      minutes: -15,
      seconds: 33,
      output: -72.24083333333333,
    },
  ];
  coords.forEach(value => {
    const ret = degMinSec2float(value.degrees, value.minutes, value.seconds);
    expect(ret).toEqual(value.output);
  });
});

// parseCoordinates tests
test('Should return blank latitude, longitude and description, when input is blank', () => {
  const expected = {
    latitude: undefined,
    longitude: undefined,
    description: '',
  };
  const ret = parseCoordinates('');
  expect(ret).toEqual(expected);
});

test('Should return blank latitude, longitude and description, when input has no coordinates', () => {
  const expected = {
    latitude: undefined,
    longitude: undefined,
    description: '',
  };
  const ret = parseCoordinates('Some wierd line without coordinates, but with numbers 123 875 and so on.');
  expect(ret).toEqual(expected);
});

test('Should return filled latitude, longitude and description, when input has coordinates in format "17.15451°E,50.33167°N"', () => {
  const expected = {
    latitude: 50.33167,
    longitude: 17.15451,
    description: 'Line with coordinates 17.15451°E,50.33167°N',
  };
  const ret = parseCoordinates('Line with coordinates 17.15451°E,50.33167°N');
  expect(ret).toEqual(expected);
});

test('Should return filled latitude, longitude and description, when input has coordinates in format "50.0950228N, 16.5538242E"', () => {
  const expected = {
    latitude: 50.0950228,
    longitude: 16.5538242,
    description: 'Line with coordinates 50.0950228N, 16.5538242E',
  };
  const ret = parseCoordinates('Line with coordinates 50.0950228N, 16.5538242E');
  expect(ret).toEqual(expected);
});

test('Should return filled latitude, longitude and description, when input has coordinates in format "49°33\'46.745"N, 16°54\'28.788"E"', () => {
  const expected = {
    latitude: 49.56298472222222,
    longitude: 16.907996666666666,
    description: 'Line with coordinates 49°33\'46.745"N, 16°54\'28.788"E',
  };
  const ret = parseCoordinates('Line with coordinates 49°33\'46.745"N, 16°54\'28.788"E');
  expect(ret).toEqual(expected);
});

test('Should return filled latitude, longitude and description, when input has coordinates in format "N 50°45.65197\', E 15°3.19075\'"', () => {
  const expected = {
    latitude: 50.760866166666666,
    longitude: 15.053179166666666,
    description: 'Line with coordinates N 50°45.65197\', E 15°3.19075\'"',
  };
  const ret = parseCoordinates('Line with coordinates N 50°45.65197\', E 15°3.19075\'"');
  expect(ret).toEqual(expected);
});

test('Should return filled latitude, longitude and description, when input has coordinates in format "27.449486,-13.050728"', () => {
  const expected = {
    latitude: 27.44948,
    longitude: -13.05072,
    description: 'Line with coordinates 27.449486,-13.050728',
  };
  const ret = parseCoordinates('Line with coordinates 27.449486,-13.050728');
  expect(ret).toEqual(expected);
});
