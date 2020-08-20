import React from 'react';
import { render } from '@testing-library/react';
import Map from './Map';

test('Map should contain Map legend', () => {
  const { getByText } = render(<Map />);
  const legend = getByText('Map operations');
  expect(legend).toBeInTheDocument();
});

test('Map should contain Distance input', () => {
    const { getByLabelText } = render(<Map />);
    const label = getByLabelText('Distance to check (in km):');
    expect(label).toBeInTheDocument();
});

test('Map should contain Check butotn', () => {
  const { getByText } = render(<Map />);
  const button = getByText('Check');
  expect(button).toBeInTheDocument();
});

test('Map should contain Load map butotn', () => {
    const { getByText } = render(<Map />);
    const button = getByText('Load map with selected points');
    expect(button).toBeInTheDocument();
});
  