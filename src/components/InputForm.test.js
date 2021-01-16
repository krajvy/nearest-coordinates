import React from 'react';
import { render } from '@testing-library/react';

import InputForm from './InputForm';

test('Form should contain Input legend', () => {
  const { getByText } = render(<InputForm />);
  const legend = getByText('Input');
  expect(legend).toBeInTheDocument();
});

test('Form should contain Coordinates input', () => {
  const { getByLabelText } = render(<InputForm />);
  const label = getByLabelText('Your coordinates:');
  expect(label).toBeInTheDocument();
});

test('Form should contain File input', () => {
  const { getByLabelText } = render(<InputForm />);
  const label = getByLabelText('Input file:');
  expect(label).toBeInTheDocument();
});

test('Form should contain Submit butotn', () => {
  const { getByText } = render(<InputForm />);
  const button = getByText('Process');
  expect(button).toBeInTheDocument();
});
