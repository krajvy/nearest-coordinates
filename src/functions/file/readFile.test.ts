import readFile from '@/functions/file/readFile';

import { expect, test } from 'vitest';

test('Should throw an error, when no file is passed', async () => {
  expect.assertions(2);

  const result = () => readFile(null as unknown as File);

  await expect(result).rejects.toBeInstanceOf(Error);
  await expect(result).rejects.toThrow(Error('No file to read passed!'));
});

test('Should throw an error, when unexpected type as file is passed', async () => {
  expect.assertions(2);

  const result = () => readFile('this is string' as unknown as File);

  await expect(result).rejects.toBeInstanceOf(Error);
  await expect(result).rejects.toStrictEqual(Error('Cannot parse unknown file as text!'));
});

test('Should throw an error, when passed file is not txt', async () => {
  const file = new File([new ArrayBuffer(1)], 'some-image.bmp', {
    type: 'image/bmp',
  });

  expect.assertions(2);

  const result = () => readFile(file);

  await expect(result).rejects.toBeInstanceOf(Error);
  await expect(result).rejects.toStrictEqual(
    Error('Cannot parse some-image.bmp file as text!'),
  );
});

test('Should read text file, when correct file passed', async () => {
  const expectedText = `test 1\n'test 2!'\n\ntest 3`;
  const file = new File([expectedText], 'test-file.txt', {
    type: 'text/plain',
  });

  expect.assertions(1);

  const result = await readFile(file);

  expect(result).toStrictEqual(expectedText);
});
