import parseText from './parseText';

/* globals test, expect */

test('Should throw an error, when passed content is not parsable', () => {
  expect.assertions(2);
  const result = expect(parseText(null));
  return (
    result.rejects.toBeInstanceOf(Error) &&
    result.rejects.toStrictEqual(Error('Cannot parse passed object as string!'))
  );
});

test('Should return empty data, when passed content has no coordinates', () => {
  const content = `
  Content with no coordinates.
  No at all.

  And so on.
  `;
  const expectation = [];

  expect.assertions(2);
  const result = expect(parseText(content));
  return (
    result.resolves.toBeInstanceOf(Array) &&
    result.resolves.toStrictEqual(expectation)
  );
});

test('Should return preprocessed data, when passed content is correct', () => {
  const content = `
  Basic, no indentation:
  Galdhopiggen - 2469 m (N 61°38.18333', E 8°18.75000')
  Hoverla - 2061 m (N 48°9.60000', E 24°30.01667')

  With indentation:
    Snezka - 1602 m (N 50°44.16667', E 15°44.41667')
    Monte Titano - 756 m (N 43°55.70000', E 12°27.13333')

  `;
  const expectation = [
    {
      latitude: 61.636388833333335,
      longitude: 8.3125,
      description: "Galdhopiggen - 2469 m (N 61°38.18333', E 8°18.75000')",
    },
    {
      latitude: 48.16,
      longitude: 24.50027783333333,
      description: "Hoverla - 2061 m (N 48°9.60000', E 24°30.01667')",
    },
    {
      latitude: 50.73611116666667,
      longitude: 15.740277833333334,
      description: "Snezka - 1602 m (N 50°44.16667', E 15°44.41667')",
    },
    {
      latitude: 43.928333333333335,
      longitude: 12.452222166666667,
      description: "Monte Titano - 756 m (N 43°55.70000', E 12°27.13333')",
    },
  ];

  expect.assertions(2);
  const result = expect(parseText(content));
  return (
    result.resolves.toBeInstanceOf(Array) &&
    result.resolves.toStrictEqual(expectation)
  );
});
