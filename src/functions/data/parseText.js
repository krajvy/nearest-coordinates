import parseCoordinates from '../data/parseCoordinates';
import issetCoordinates from '../validator/issetCoordinates';

const parseText = (data) =>
  new Promise((resolve, reject) => {
    const output = [];

    if (typeof data !== 'string' && !(data instanceof String)) {
      reject(new Error(`Cannot parse passed ${typeof data} as string!`));
    }

    // cut by newlines
    try {
      const lines = data.split(/\n/);
      for (const i in lines) {
        const line = lines[i].trim();
        if (line) {
          const parsed = parseCoordinates(line);
          // get only valid coordinates data
          if (issetCoordinates(parsed)) {
            output.push(parsed);
          }
        }
      }
    } catch (error) {
      reject(error);
    }
    // Successfull end
    resolve(output);
  });

export default parseText;
