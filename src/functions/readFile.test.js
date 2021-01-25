import readFile from './readFile';

/* globals test, expect */

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
