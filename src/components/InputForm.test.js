import React from 'react';
import { render, screen } from '@testing-library/react';

import InputForm from './InputForm';

import { Provider } from 'react-redux';
import store from './../state/store';

/* globals test, expect */

const renderForm = () => render(
  <Provider store={store}>
    <InputForm />
  </Provider>,
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
