import React from 'react';
import { render, screen } from '@testing-library/react';

import Map from './Map';

/* globals test, expect */

test('Map should contain Map legend', () => {
  render(<Map />);
  const legend = screen.getByText('Map operations');
  expect(legend).toBeInTheDocument();
});

test('Map should contain Distance input', () => {
  render(<Map />);
  const label = screen.getByLabelText('Distance to check (in km):');
  expect(label).toBeInTheDocument();
});

test('Map should contain Check butotn', () => {
  render(<Map />);
  const button = screen.getByText('Check');
  expect(button).toBeInTheDocument();
});

test('Map should contain Load map butotn', () => {
  render(<Map />);
  const button = screen.getByText('Load map with selected points');
  expect(button).toBeInTheDocument();
});
