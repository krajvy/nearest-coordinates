import type { MapFieldRow } from '@/types';

import { expect, test } from 'vitest';
import addMapField from '@/functions/data/addMapField';

test('Should set "displayOnMap" property to false in datafield', () => {
  const input: MapFieldRow[] = [
    { description: 'First item' },
    { description: 'Second item' },
    { description: 'Third item' },
    { description: 'Fourth item' },
    { description: 'Fifth item' },
  ];
  const expected: MapFieldRow[] = [
    { description: 'First item', displayOnMap: false },
    { description: 'Second item', displayOnMap: false },
    { description: 'Third item', displayOnMap: false },
    { description: 'Fourth item', displayOnMap: false },
    { description: 'Fifth item', displayOnMap: false },
  ];

  expect(addMapField(input)).toStrictEqual(expected);
});
