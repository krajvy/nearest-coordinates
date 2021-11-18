import getMutualPosition from './getMutualPosition';

/* globals test, expect */

test('Should calculate correct mutual position of two given coordinates', () => {
  const inputs = [
    {
      coord1: {},
      coord2: {},
      output: {
        distance: 0,
        azimuth: 0,
      },
    },
    {
      coord1: {
        latitude: 0,
        longitude: 0,
      },
      coord2: {
        latitude: 0,
        longitude: 0,
      },
      output: {
        distance: 0,
        azimuth: 0,
      },
    },
    {
      coord1: {
        latitude: 50.73611,
        longitude: 15.74028,
      },
      coord2: {
        latitude: 50.73611,
        longitude: 15.74028,
      },
      output: {
        distance: 0,
        azimuth: 0,
      },
    },
    {
      coord1: {
        latitude: 50.73611,
        longitude: 15.74028,
      },
      coord2: {
        latitude: 48.16,
        longitude: 24.50028,
      },
      output: {
        distance: 694.48,
        azimuth: 111,
      },
    },
    {
      coord1: {
        latitude: 50.73611,
        longitude: 15.74028,
      },
      coord2: {
        latitude: -3.07641,
        longitude: 37.354,
      },
      output: {
        distance: 6327.82,
        azimuth: 154,
      },
    },
    {
      coord1: {
        latitude: 50.73611,
        longitude: 15.74028,
      },
      coord2: {
        latitude: -39.29608,
        longitude: 174.06385,
      },
      output: {
        distance: 17901.99,
        azimuth: 61,
      },
    },
    {
      coord1: {
        latitude: 50.73611,
        longitude: 15.74028,
      },
      coord2: {
        latitude: -15.91591,
        longitude: -69.29281,
      },
      output: {
        distance: 11028.87,
        azimuth: 256,
      },
    },
    {
      coord1: {
        latitude: 50.73611,
        longitude: 15.74028,
      },
      coord2: {
        latitude: 64.3826,
        longitude: -16.93567,
      },
      output: {
        distance: 2424.44,
        azimuth: 321,
      },
    },
  ];
  inputs.forEach((value) => {
    const ret = getMutualPosition(value.coord1, value.coord2);
    expect(ret).toStrictEqual(value.output);
  });
});
