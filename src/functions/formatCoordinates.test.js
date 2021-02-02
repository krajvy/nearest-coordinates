import formatCoordinates from './formatCoordinates';

/* globals describe, test, expect */

describe('Test formatCoordinates results', () => {
  const dataProvider = [
    [0, 0, '0,0'],
    [61.636388833333335, 8.3125, '61.63639,8.3125'],
    [48.16, 24.50027783333333, '48.16,24.50028'],
    [-3.0764083, 37.3539986, '-3.07641,37.354'],
    [-15.9159111, -69.2928119, '-15.91591,-69.29281'],
    [64.3825969, -16.9356697, '64.3826,-16.93567'],
  ];
  dataProvider.forEach(instance => {
    const latitude = instance[0];
    const longitude = instance[1];
    const expectation = instance[2];

    test('Should give all expected results', () => {
      expect(formatCoordinates(latitude, longitude)).toEqual(expectation);
    });
  });
});
