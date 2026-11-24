import readAllFiles from '@/functions/file/readAllFiles';

import { expect, test } from 'vitest';

test('Should throw an error, when no files are passed', async () => {
  expect.assertions(2);

  const result = () => readAllFiles(null as unknown as File[]);

  await expect(result).rejects.toBeInstanceOf(Error);
  await expect(result).rejects.toStrictEqual(Error('No files to read passed!'));
});

test('Should throw an error, when unexpected type as files are passed', async () => {
  expect.assertions(2);

  const result = () => readAllFiles('this is string' as unknown as File[]);
  
  await expect(result).rejects.toBeInstanceOf(Error);
  await expect(result).rejects.toStrictEqual(Error('No files to read passed!'));
});

test('Should throw an error, when single passed file in list is not txt', async () => {
  const file = new File([new ArrayBuffer(1)], 'some-image.bmp', {
    type: 'image/bmp',
  });

  expect.assertions(2);

  const result = () => readAllFiles([file]);

  await expect(result).rejects.toBeInstanceOf(Error);
  await expect(result).rejects.toStrictEqual(
    Error('Cannot parse some-image.bmp file as text!'),
  );
});

test('Should read text file, when single passed file in list is correct txt', async () => {
  const file = new File([`test 1\n'test 2!'\n\ntest 3`], 'test-file.txt', {
    type: 'text/plain',
  });
  const expectedText = `test 1\n'test 2!'\n\ntest 3`;

  expect.assertions(1);

  const result = await readAllFiles([file]);

  expect(result).toStrictEqual(expectedText);
});

test('Should throw an error, when passed files in list are both not txt', async () => {
  const file1 = new File([new ArrayBuffer(1)], 'some-image.bmp', {
    type: 'image/bmp',
  });
  const file2 = new File([new ArrayBuffer(1)], 'some-source.php', {
    type: 'application/php',
  });

  expect.assertions(2);

  const result = () => readAllFiles([file1, file2]);

  await expect(result).rejects.toBeInstanceOf(Error);
  await expect(result).rejects.toStrictEqual(
    Error('Cannot parse some-image.bmp file as text!'),
  );
});

test('Should throw an error, when passed files in list are one correct txt and one not txt', async () => {
  const file1 = new File([`test 1\n'test 2!'\n\ntest 3`], 'test-file.txt', {
    type: 'text/plain',
  });
  const file2 = new File([new ArrayBuffer(1)], 'some-image.bmp', {
    type: 'image/bmp',
  });

  expect.assertions(2);

  const result = () => readAllFiles([file1, file2]);

  await expect(result).rejects.toBeInstanceOf(Error);
  await expect(result).rejects.toStrictEqual(
    Error('Cannot parse some-image.bmp file as text!'),
  );
});

test('Should throw an error, when passed files in list are one not txt and one correct txt', async () => {
  const file1 = new File([new ArrayBuffer(1)], 'some-image.bmp', {
    type: 'image/bmp',
  });
  const file2 = new File([`test 1\n'test 2!'\n\ntest 3`], 'test-file.txt', {
    type: 'text/plain',
  });

  expect.assertions(2);

  const result = () => readAllFiles([file1, file2]);

  await expect(result).rejects.toBeInstanceOf(Error);
  await expect(result).rejects.toStrictEqual(
    Error('Cannot parse some-image.bmp file as text!'),
  );
});

test('Should read text file, when passed files in list are both correct txt', async () => {
  const file1 = new File([`test 1\n'test 2!'\n\ntest 3`], 'test-file-one.txt', {
    type: 'text/plain',
  });
  const file2 = new File([`test 4\ntest 5`], 'test-file-two.txt', {
    type: 'text/plain',
  });
  const expectedText = `test 1\n'test 2!'\n\ntest 3\ntest 4\ntest 5`;

  expect.assertions(1);

  const result = await readAllFiles([file1, file2]);

  expect(result).toStrictEqual(expectedText);
});
