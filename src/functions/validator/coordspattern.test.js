import { COORDSPATTERN } from './coordspattern';

/* globals describe, test, expect */

describe('Test COORDSPATTERN regex', () => {
  const dataProvider = [
    ['27.449486,13.050728', true],
    ['-27.449486,13.050728', true],
    ['-27.449486,-13.050728', true],
    ['27.449486,-13.050728', true],
    ['49°33\'46.745"N, 16°54\'28.788"E', true],
    ['49°33\'46.745"S, 16°54\'28.788"E', true],
    ['49°33\'46.745"S, 16°54\'28.788"W', true],
    ['49°33\'46.745"N, 16°54\'28.788"W', true],
    ["N 50°45.65197', E 15°3.19075'", true],
    ["S 61°38.18333', E 8°18.75000'", true],
    ["S 43°55.70000', W 12°27.13333'", true],
    ["N 43°55.70000', W 12°27.13333'", true],
    ['17.15451°E,50.33167°N', true],
    ['37.36789°W,20.34167°N', true],
    ['7.36789°W,2.34167°S', true],
    ['3.36789°E,13.34167°S', true],
    ['50.0950228N, 16.5538242E', true],
    ['3.0764083S, 37.3539986E', true],
    ['15.9159111S, 69.2928119W', true],
    ['64.3825969N, 16.9356697W', true],
    ['abc123', false],
    ['123456', false],
    ['3.36789°E,13.34167°X', false],
    ["S 61°38.18333', F 8°18.75000'", false],
    ['27.449486-13.050728', false],
  ];
  const regex = new RegExp(COORDSPATTERN);
  dataProvider.forEach((instance) => {
    const coords = instance[0];
    const expectation = instance[1];

    test('Should give all expected results', () => {
      expect(regex.test(coords)).toStrictEqual(expectation);
    });
  });
});
