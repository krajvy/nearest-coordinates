const readFile = (file) =>
  new Promise((resolve, reject) => {
    if (!FileReader) {
      reject(new Error('FileReader does not exists!'));
    }

    if (!file) {
      reject(new Error('No file to read passed!'));
    }

    if (!(file instanceof File) || !file.type.match('text.*')) {
      const fileName = file.name || 'unknown';
      reject(new Error(`Cannot parse ${fileName} file as text!`));
    }

    const fileReader = new FileReader();
    fileReader.onerror = reject;

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.readAsText(file);
  });

export default readFile;
