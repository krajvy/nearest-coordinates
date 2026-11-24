import parsePoiText from "@/functions/data/parsePoiText";
import getMutualPosition from "@/functions/math/getMutualPosition";
import type { Coordinates, DataTableRow } from "@/types";

const getDataFromPoiFiles = (filesData: string, startCoordinates: Coordinates): DataTableRow[] => {
  const outputData: DataTableRow[] = [];

  try {
    const coordinatesWithDescriptionData = parsePoiText(filesData);

    coordinatesWithDescriptionData.forEach((coordinateFromPoiFile, rowId) => {
      const mutualPosition = getMutualPosition(startCoordinates, coordinateFromPoiFile as Coordinates);

      outputData.push({
        ...{
          rowId,
          latitude: null,
          longitude: null,
          distance: 0,
          azimuth: 0,
          description: '',
          displayOnMap: false,
        },
        ...coordinateFromPoiFile,
        ...mutualPosition,
      } as DataTableRow);
    });
  } catch (error) {
    throw new Error('Error reading files: ' + (error as Error).message);
  }

  return outputData;
};

export default getDataFromPoiFiles;
