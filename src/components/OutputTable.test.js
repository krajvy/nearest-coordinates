import React from 'react';
import { render, screen } from '@testing-library/react';

import OutputTable from './OutputTable';

import { Provider } from 'react-redux';
import store from './../state/store';

/* globals test, expect */

test('Output table should contain all needed rows', () => {
  render(
    <Provider store={store}>
      <OutputTable />
    </Provider>,
  );
  const columns = ['Coordinates', 'Distance', 'Azimuth', 'Description', 'Map'];

  columns.forEach(heading => {
    const text = screen.getByText(heading);
    expect(text).toBeInTheDocument();
  });
});
