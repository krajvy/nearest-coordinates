import addMapField from './addMapField';

/* globals test, expect */

test('Should set "displayOnMap" property to false in datafield', () => {
  const input = [
    { description: 'First item' },
    { description: 'Second item' },
    { description: 'Third item' },
    { description: 'Fourth item' },
    { description: 'Fifth item' },
  ];
  const expected = [
    { description: 'First item', displayOnMap: false },
    { description: 'Second item', displayOnMap: false },
    { description: 'Third item', displayOnMap: false },
    { description: 'Fourth item', displayOnMap: false },
    { description: 'Fifth item', displayOnMap: false },
  ];

  expect(addMapField(input)).toEqual(expected);
});
