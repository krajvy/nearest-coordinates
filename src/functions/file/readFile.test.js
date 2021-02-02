import readFile from './readFile';

/* globals test, expect */

test('Should throw an error, when no file is passed', async () => {
  const fileList = [];
  await readFile(fileList)
    .catch(error => {
      expect(error).toEqual(Error('No file to read passed!'));
    });
});

test('Should throw an error, when passed file is not txt', async () => {
  const fileList = [
    {
      type: 'image/bmp',
    },
  ];
  await readFile(fileList)
    .catch(error => {
      expect(error).toEqual(Error('Cannot parse this file as text!'));
    });
});
