import React from 'react';
import { render, screen } from '@testing-library/react';

import NCState from './../context/NCState';

import InputForm from './InputForm';

/* globals test, expect */

const renderForm = () => render(
  <NCState>
    <InputForm />
  </NCState>,
);

test('Form should contain Input legend', () => {
  renderForm();
  const legend = screen.getByText('Input');
  expect(legend).toBeInTheDocument();
});

test('Form should contain Coordinates input', () => {
  renderForm();
  const label = screen.getByLabelText('Your coordinates:');
  expect(label).toBeInTheDocument();
});

test('Form should contain File input', () => {
  renderForm();
  const label = screen.getByLabelText('Input file:');
  expect(label).toBeInTheDocument();
});

test('Form should contain Submit button', () => {
  renderForm();
  const button = screen.getByText('Read data');
  expect(button).toBeInTheDocument();
});
