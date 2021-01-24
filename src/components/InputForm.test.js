import React from 'react';
import { render } from '@testing-library/react';

import NCState from './../context/NCState';

import InputForm from './InputForm';

/* globals test, expect */

const renderForm = () => render(
  <NCState>
    <InputForm />
  </NCState>,
);

test('Form should contain Input legend', () => {
  const { getByText } = renderForm();
  const legend = getByText('Input');
  expect(legend).toBeInTheDocument();
});

test('Form should contain Coordinates input', () => {
  const { getByLabelText } = renderForm();
  const label = getByLabelText('Your coordinates:');
  expect(label).toBeInTheDocument();
});

test('Form should contain File input', () => {
  const { getByLabelText } = renderForm();
  const label = getByLabelText('Input file:');
  expect(label).toBeInTheDocument();
});

test('Form should contain Submit butotn', () => {
  const { getByText } = renderForm();
  const button = getByText('Read data');
  expect(button).toBeInTheDocument();
});
