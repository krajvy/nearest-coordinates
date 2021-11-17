import readAllFiles from './readAllFiles';

/* globals test, expect */

test('Should throw an error, when no files are passed', () => {
  expect.assertions(1);
  return expect(readAllFiles(null)).rejects.toStrictEqual(
    Error('No files to read passed!'),
  );
});

test('Should throw an error, when unexpected type as files are passed', () => {
  expect.assertions(1);
  return expect(readAllFiles('this is string')).rejects.toStrictEqual(
    Error('No files to read passed!'),
  );
});

test('Should throw an error, when single passed file in list is not txt', () => {
  const file = new File([new ArrayBuffer(1)], 'some-image.bmp', {
    type: 'image/bmp',
  });

  expect.assertions(1);
  return expect(readAllFiles([file])).rejects.toStrictEqual(
    Error('Cannot parse some-image.bmp file as text!'),
  );
});

test('Should read text file, when single passed file in list is correct txt', () => {
  const expectedText = `test 1\n'test 2!'\n\ntest 3`;
  const file = new File([expectedText], 'test-file.txt', {
    type: 'text/plain',
  });

  expect.assertions(1);
  return expect(readAllFiles([file])).resolves.toStrictEqual(expectedText);
});

test('Should throw an error, when passed files in list are both not txt', () => {
  const file1 = new File([new ArrayBuffer(1)], 'some-image.bmp', {
    type: 'image/bmp',
  });
  const file2 = new File([new ArrayBuffer(1)], 'some-source.php', {
    type: 'application/php',
  });

  expect.assertions(1);
  return expect(readAllFiles([file1, file2])).rejects.toStrictEqual(
    Error('Cannot parse some-image.bmp file as text!'),
  );
});

test('Should throw an error, when passed files in list are one correct txt and one not txt', () => {
  const file1 = new File([`test 1\n'test 2!'\n\ntest 3`], 'test-file.txt', {
    type: 'text/plain',
  });
  const file2 = new File([new ArrayBuffer(1)], 'some-image.bmp', {
    type: 'image/bmp',
  });

  expect.assertions(1);
  return expect(readAllFiles([file1, file2])).rejects.toStrictEqual(
    Error('Cannot parse some-image.bmp file as text!'),
  );
});

test('Should throw an error, when passed files in list are one not txt and one correct txt', () => {
  const file1 = new File([new ArrayBuffer(1)], 'some-image.bmp', {
    type: 'image/bmp',
  });
  const file2 = new File([`test 1\n'test 2!'\n\ntest 3`], 'test-file.txt', {
    type: 'text/plain',
  });

  expect.assertions(1);
  return expect(readAllFiles([file1, file2])).rejects.toStrictEqual(
    Error('Cannot parse some-image.bmp file as text!'),
  );
});

test('Should read text file, when passed files in list are both correct txt', () => {
  const file1 = new File([`test 1\n'test 2!'\n\ntest 3`], 'test-file-one.txt', {
    type: 'text/plain',
  });
  const file2 = new File([`test 4\ntest 5`], 'test-file-two.txt', {
    type: 'text/plain',
  });

  expect.assertions(1);
  return expect(readAllFiles([file1, file2])).resolves.toStrictEqual(
    `test 1\n'test 2!'\n\ntest 3\ntest 4\ntest 5`,
  );
});
