import type {
  NcAction,
  NcActionReadMainDataPayload,
  NcActionSetDisplayOnMapPayload,
  NcActionSetDisplayOnMapByDistancePayload,
  NcState,
} from "@/types";

import { NcActionsEnum } from "@/constants";

export const appReducer = (state: NcState, action: NcAction): NcState => {

  switch (action.type) {
    case NcActionsEnum.ReadMainData: {
      const payload = action.payload as NcActionReadMainDataPayload;

      const newState = {
        ...state,
        coordIn: payload.coordIn,
        coordInParsed: payload.parsedCoord,
        filesIn: payload.filesIn.map(file => ({ name: file.name, size: file.size })),
        filesInList: payload.filesIn,
        filesRawData: payload.filesRawData,
        filesParsedData: payload.dataFromPoiFiles,
      };

      return newState;
    }

    case NcActionsEnum.SetDisplayOnMap: {
      const { rowId: changedRowId } = action.payload as NcActionSetDisplayOnMapPayload;

      const updatedFilesParsedData = state.filesParsedData?.map(
        actualrow => actualrow.rowId === changedRowId ?
          {
            ...actualrow,
            displayOnMap: !actualrow.displayOnMap,
          } :
          actualrow,
      ) || null;

      const newState = {
        ...state,
        filesParsedData: updatedFilesParsedData,
      };

      return newState;
    }

    case NcActionsEnum.SetDisplayOnMapByDistance: {
      const { distance: desiredDistance } = action.payload as NcActionSetDisplayOnMapByDistancePayload;

      const updatedFilesParsedData = state.filesParsedData?.map(actualRow => {
        if (Math.floor(actualRow.distance) <= desiredDistance) {
          return { ...actualRow, displayOnMap: true };
        }
        return { ...actualRow, displayOnMap: false };
      }) || null;

      const newState = {
        ...state,
        mapDistance: desiredDistance,
        filesParsedData: updatedFilesParsedData,
      };

      return newState;
    }

    default:
      return state;
  }
};
