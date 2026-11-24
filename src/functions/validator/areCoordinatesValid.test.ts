import type { Coordinates } from '@/types';

import { expect, test } from 'vitest';
import areCoordinatesValid from '@/functions/validator/areCoordinatesValid';

test('issetCoordinates should return false when latitude is not set', () => {
  const coord = {
    longitude: 123456,
  } as Coordinates;
  const ret = areCoordinatesValid(coord);
  expect(ret).toBeFalsy();
});

test('issetCoordinates should return false when latitude is null', () => {
  const coord = {
    latitude: null,
    longitude: 123456,
  };
  const ret = areCoordinatesValid(coord);
  expect(ret).toBeFalsy();
});

test('issetCoordinates should return false when latitude is empty', () => {
  const coord = {
    latitude: '',
    longitude: 123456,
  };
  const ret = areCoordinatesValid(coord);
  expect(ret).toBeFalsy();
});

test('issetCoordinates should return false when longitude is not set', () => {
  const coord = {
    latitude: 123456,
  } as Coordinates;
  const ret = areCoordinatesValid(coord);
  expect(ret).toBeFalsy();
});

test('issetCoordinates should return false when longitude is null', () => {
  const coord = {
    latitude: 123456,
    longitude: null,
  };
  const ret = areCoordinatesValid(coord);
  expect(ret).toBeFalsy();
});

test('issetCoordinates should return false when longitude is empty', () => {
  const coord = {
    latitude: 123456,
    longitude: '',
  };
  const ret = areCoordinatesValid(coord);
  expect(ret).toBeFalsy();
});

test('issetCoordinates should return false when latitude and lognitude are not set', () => {
  const coord = {} as Coordinates;
  const ret = areCoordinatesValid(coord);
  expect(ret).toBeFalsy();
});

test('issetCoordinates should return false when latitude and lognitude are null', () => {
  const coord = {
    latitude: null,
    longitude: null,
  };
  const ret = areCoordinatesValid(coord);
  expect(ret).toBeFalsy();
});

test('issetCoordinates should return false when latitude and lognitude are empty', () => {
  const coord = {
    latitude: '',
    longitude: '',
  };
  const ret = areCoordinatesValid(coord);
  expect(ret).toBeFalsy();
});

test('issetCoordinates should return true when latitude and lognitude are set', () => {
  const coord = {
    latitude: 123456,
    longitude: 123456,
  };
  const ret = areCoordinatesValid(coord);
  expect(ret).toBeTruthy();
});
