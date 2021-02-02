import precisionRound from './precisionRound';

/* globals describe, test, expect */

describe('Test precisionRound results', () => {
  const dataProvider = [
    [0, 0, 0],
    [24.50027783333333, 1, 24.5],
    [19, 2, 19],
    [-3.0764083, 3, -3.076],
    [61.636388833333335, 4, 61.6364],
    [8.31, 5, 8.31],
    [-39.2960789, 6, -39.296079],
  ];
  dataProvider.forEach(instance => {
    const what = instance[0];
    const accuracy = instance[1];
    const expectation = instance[2];

    test('Should give all expected results', () => {
      expect(precisionRound(what, accuracy)).toEqual(expectation);
    });
  });
});
