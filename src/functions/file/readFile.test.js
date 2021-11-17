import readFile from './readFile';

/* globals test, expect */

test('Should throw an error, when no file is passed', () => {
  expect.assertions(1);
  return expect(readFile(null)).rejects.toStrictEqual(
    Error('No file to read passed!'),
  );
});

test('Should throw an error, when unexpected type as file is passed', () => {
  expect.assertions(1);
  return expect(readFile('this is string')).rejects.toStrictEqual(
    Error('Cannot parse unknown file as text!'),
  );
});

test('Should throw an error, when passed file is not txt', () => {
  const file = new File([new ArrayBuffer(1)], 'some-image.bmp', {
    type: 'image/bmp',
  });

  expect.assertions(1);
  return expect(readFile(file)).rejects.toStrictEqual(
    Error('Cannot parse some-image.bmp file as text!'),
  );
});

test('Should read text file, when correct file passed', () => {
  const expectedText = `test 1\n'test 2!'\n\ntest 3`;
  const file = new File([expectedText], 'test-file.txt', {
    type: 'text/plain',
  });

  expect.assertions(1);
  return expect(readFile(file)).resolves.toStrictEqual(expectedText);
});
