import sortByDistance from './sortByDistance';

/* globals test, expect */

test('Test sortByDistance results', () => {
  const what = [
    { distance: 97 },
    { distance: 48.2 },
    { distance: 545 },
    { distance: 23.23 },
    { distance: 9965.98 },
    { distance: 9447 },
    { distance: 2.1 },
    { distance: 7554545.9876 },
    { distance: 42 },
    { distance: 3568 },
  ];
  const expectation = [
    { distance: 2.1 },
    { distance: 23.23 },
    { distance: 42 },
    { distance: 48.2 },
    { distance: 97 },
    { distance: 545 },
    { distance: 3568 },
    { distance: 9447 },
    { distance: 9965.98 },
    { distance: 7554545.9876 },
  ];

  expect(sortByDistance(what)).toStrictEqual(expectation);
});
