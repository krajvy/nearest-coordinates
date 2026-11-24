import type { CoordinatsWithDescription } from '@/types';

import parseCoordinates from '@/functions/data/parseCoordinates';
import areCoordinatesValid from '@/functions/validator/areCoordinatesValid';

const parsePoiText = (data: string): CoordinatsWithDescription[] => {
  const output: CoordinatsWithDescription[] = [];

  if (typeof data !== 'string') {
    throw new Error(`Cannot parse passed ${typeof data} as string!`);
  }

  const lines = data.split(/\n/);
  for (const i in lines) {
    const line = lines[i]?.trim();
    if (line) {
      const parsed = parseCoordinates(line);
      if (areCoordinatesValid(parsed)) {
        output.push(parsed);
      }
    }
  }

  return output;
};

export default parsePoiText;
