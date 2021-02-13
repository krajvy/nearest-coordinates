import React from 'react';
import { render, screen } from '@testing-library/react';

import MapForm from './MapForm';

/* globals test, expect */

test('Map should contain Map legend', () => {
  render(<MapForm />);
  const legend = screen.getByText('Map operations');
  expect(legend).toBeInTheDocument();
});

test('Map should contain Distance input', () => {
  render(<MapForm />);
  const label = screen.getByLabelText('Distance to check (in km):');
  expect(label).toBeInTheDocument();
});

test('Map should contain Check butotn', () => {
  render(<MapForm />);
  const button = screen.getByText('Check');
  expect(button).toBeInTheDocument();
});

test('Map should contain Load map butotn', () => {
  render(<MapForm />);
  const button = screen.getByText('Load map with selected points');
  expect(button).toBeInTheDocument();
});
