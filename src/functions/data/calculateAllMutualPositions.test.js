import calculateAllMutualPositions from './calculateAllMutualPositions';

/* globals test, expect */

test('Should return empty array, when incorret input coordinates are send', () => {
  const coord = {};
  const data = [
    {
      latitude: 50.0950228,
      longitude: 16.5538242,
      description: 'Line with coordinates 50.0950228N, 16.5538242E',
    },
  ];
  const expected = [];

  const ret = calculateAllMutualPositions(coord, data);
  expect(ret).toStrictEqual(expected);
});

test('Should return empty array, when no data are send', () => {
  const coord = {
    latitude: 50.0950228,
    longitude: 16.5538242,
  };
  const data = [];
  const expected = [];

  const ret = calculateAllMutualPositions(coord, data);
  expect(ret).toStrictEqual(expected);
});

test('Should calculate correct mutual positions of all given data', () => {
  const coord = {
    latitude: 50.0950228,
    longitude: 16.5538242,
  };
  const data = [
    {
      latitude: 50.0950228,
      longitude: 16.5538242,
      description: 'Line with coordinates 50.0950228N, 16.5538242E',
    },
    {
      latitude: 27.44948,
      longitude: -13.05072,
      description: 'Line with coordinates 27.449486,-13.050728',
    },
    {
      latitude: 61.63639,
      longitude: 8.3125,
      description: "Line with coordinates N 61°38.18333', E 8°18.75000'",
    },
    {
      latitude: -3.07641,
      longitude: 37.354,
      description: 'Line with coordinates 3.0764083S, 37.3539986E',
    },
    {
      latitude: -15.91591,
      longitude: -69.29281,
      description: 'Line with coordinates 15.9159111S, 69.2928119W',
    },
    {
      latitude: -39.29608,
      longitude: 174.06385,
      description: 'Line with coordinates 39.2960789S, 174.0638503E',
    },
  ];
  const expected = [
    {
      latitude: 50.0950228,
      longitude: 16.5538242,
      description: 'Line with coordinates 50.0950228N, 16.5538242E',
      distance: 0,
      azimuth: 0,
    },
    {
      latitude: 27.44948,
      longitude: -13.05072,
      description: 'Line with coordinates 27.449486,-13.050728',
      distance: 3551.76,
      azimuth: 236,
    },
    {
      latitude: 61.63639,
      longitude: 8.3125,
      description: "Line with coordinates N 61°38.18333', E 8°18.75000'",
      distance: 1379.98,
      azimuth: 342,
    },
    {
      latitude: -3.07641,
      longitude: 37.354,
      description: 'Line with coordinates 3.0764083S, 37.3539986E',
      distance: 6238.6,
      azimuth: 155,
    },
    {
      latitude: -15.91591,
      longitude: -69.29281,
      description: 'Line with coordinates 15.9159111S, 69.2928119W',
      distance: 11067.99,
      azimuth: 257,
    },
    {
      latitude: -39.29608,
      longitude: 174.06385,
      description: 'Line with coordinates 39.2960789S, 174.0638503E',
      distance: 17883.21,
      azimuth: 64,
    },
  ];

  const ret = calculateAllMutualPositions(coord, data);
  expect(ret).toStrictEqual(expected);
});
