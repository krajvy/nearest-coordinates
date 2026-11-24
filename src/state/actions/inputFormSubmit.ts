import { NcActionsEnum } from '@/constants';
import parseCoordinates from '@/functions/data/parseCoordinates';
import readAllFiles from '@/functions/file/readAllFiles';
import getDataFromPoiFiles from "@/functions/data/getDataFromPoiFiles";
import type { NcContextType, Coordinates } from '@/types';

const inputFormSubmit = async (formData: FormData, state: NcContextType['state'], dispatch: NcContextType['dispatch']) => {
  const coordIn = formData.get('coord_in') as string;

  if (!coordIn || coordIn.trim() === '') {
    throw new Error('Input coordinates are required');
  }

  const parsedCoord = parseCoordinates(coordIn);

  let filesIn = formData.getAll('files_in') as File[];

  // When there is no new file in form, use the previous loaded ones
  const filesSizeSum = filesIn.reduce((sum, file) => sum + file.size, 0);
  if (filesSizeSum === 0) {
    filesIn = state.filesInList || [];
  }

  const filesRawData = await readAllFiles(filesIn);

  const dataFromPoiFiles = getDataFromPoiFiles(filesRawData, parsedCoord as Coordinates);

  dispatch({ type: NcActionsEnum.ReadMainData, payload: { coordIn, parsedCoord, filesIn, filesRawData, dataFromPoiFiles } });
};

export default inputFormSubmit;
