import readFile from './readFile';

const readAllFiles = (fileList) => {
  const promises = [];

  if (!FileReader) {
    const promiseReject = Promise.reject(
      new Error('FileReader does not exists!'),
    );
    promises.push(promiseReject);
    return promiseReject;
  }

  if (!fileList || typeof fileList !== 'object' || !fileList.length) {
    const promiseReject = Promise.reject(new Error('No files to read passed!'));
    promises.push(promiseReject);
    return promiseReject;
  }

  Array.from(fileList).forEach((file) => {
    promises.push(
      new Promise((resolve, reject) => {
        readFile(file)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      }),
    );
  });

  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then((data) => {
        resolve(data.join(`\n`));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default readAllFiles;
