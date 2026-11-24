import precisionRound from '@/functions/math/precisionRound';

import { describe, expect, test } from 'vitest';

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
  dataProvider.forEach((instance) => {
    const what = instance[0] as number;;
    const accuracy = instance[1] as number;
    const expectation = instance[2];

    test(`Should give all expected results for ${what} with accuracy ${accuracy}`, () => {
      expect(precisionRound(what, accuracy)).toStrictEqual(expectation);
    });
  });
});
