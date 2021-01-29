const readFile = fileList => new Promise((resolve, reject) => {
  if (!FileReader) {
    reject(new Error('FileReader does not exists!'));
  }

  if (fileList.length < 1) {
    reject(new Error('No file to read passed!'));
  }

  const file = fileList[0];
  if (!file.type.match('text.*')) {
    reject(new Error('Cannot parse this file as text!'));
  }

  const fileReader = new FileReader();
  fileReader.onerror = reject;

  fileReader.onload = () => {
    resolve(fileReader.result);
  };

  fileReader.readAsText(file);
});

export default readFile;
