const readFile = fileList => new Promise((resolve, reject) => {
  // check if we have FileReader global object
  if (!FileReader) {
    reject(new Error('FileReader does not exists!'));
  }

  // just use first file
  const file = fileList[0];
  // allow to read only txt files
  if (!file.type.match('text.*')) {
    reject(new Error('Cannot parse this file as text!'));
  }

  // prepare file reading
  const fileReader = new FileReader();
  fileReader.onerror = reject;

  fileReader.onload = () => {
    resolve(fileReader.result);
  };

  fileReader.readAsText(file);
});

export default readFile;
