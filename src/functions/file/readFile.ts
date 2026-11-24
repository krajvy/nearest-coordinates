const readFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!FileReader) {
      reject(new Error('FileReader does not exists!'));
    }

    if (!file) {
      reject(new Error('No file to read passed!'));
    }

    if (!(file instanceof File) || !file.type.match('text/.*')) {
      reject(new Error(`Cannot parse ${file.name || 'unknown'} file as text!`));
    }

    const fileReader = new FileReader();
    fileReader.onerror = reject;

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.readAsText(file);
  });

export default readFile;
