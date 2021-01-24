import React from 'react';
import { render } from '@testing-library/react';

import OutputTable from './OutputTable';

/* globals test, expect */

test('Output table should contain all needed rows', () => {
  const { getByText } = render(<OutputTable />);
  const columns = ['Coordinates', 'Distance', 'Azimuth', 'Description', 'Map'];

  columns.forEach(heading => {
    const text = getByText(heading);
    expect(text).toBeInTheDocument();
  });
});
