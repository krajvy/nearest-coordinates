import type { NcState } from "@/types";

export const initialState: NcState = {
  coordIn: '',
  coordInParsed: null,
  filesIn: null,
  filesInList: null,
  filesRawData: '',
  filesParsedData: null,
  mapDistance: 50,
  errorMessage: null,
};

export const NcActionsEnum = {
  ReadMainData: 'READ_MAIN_DATA',
  SetDisplayOnMap: 'SET_DISPLAY_ON_MAP',
  SetDisplayOnMapByDistance: 'SET_DISPLAY_ON_MAP_BY_DISTANCE',
};
