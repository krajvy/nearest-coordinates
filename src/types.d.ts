import { NcActionsEnum } from './constants';

export type DataRowBase = {
  rowId: number;
}

export type MapFieldRow = {
  description: string;
  displayOnMap?: boolean;
};

export type LatLon = number | string | null;

export type Coordinates = {
  latitude: LatLon;
  longitude: LatLon;
};

export type CoordinatsWithDescription = Coordinates & {
  description: string;
};

export type MutualPosition = {
  distance: number;
  azimuth: number;
};

export type DataTableRow = DataRowBase & Coordinates & MutualPosition & MapFieldRow;

export type FileInDetails = {
  name: string;
  size: number;
}

export type NcState = {
  coordIn: string,
  coordInParsed: CoordinatsWithDescription | null,
  filesIn: FileInDetails[] | null,
  filesInList: File[] | null,
  filesRawData: string,
  filesParsedData: DataTableRow[] | null,
  mapDistance: number,
  errorMessage: string | null,
};

export type NcContextType = {
  state: NcState;
  dispatch: ActionDispatch<[action: NcAction]>;
};

export type NcActionReadMainDataPayload = {
  coordIn: string;
  parsedCoord: CoordinatsWithDescription;
  filesIn: File[];
  filesRawData: string;
  dataFromPoiFiles: DataTableRow[];
};

export type NcActionReadMainData = {
  type: NcActionsEnum.ReadMainData;
  payload: NcActionReadMainDataPayload;
};

export type NcActionSetDisplayOnMapPayload = {
  rowId: DataRowBase['rowId'];
};

export type NcActionSetDisplayOnMap = {
  type: NcActionsEnum.SetDisplayOnMap;
  payload: NcActionSetDisplayOnMapPayload;
};

export type NcActionSetDisplayOnMapByDistancePayload = {
  distance: number;
};

export type NcActionSetDisplayOnMapByDistance = {
  type: NcActionsEnum.SetDisplayOnMapByDistance;
  payload: NcActionSetDisplayOnMapByDistancePayload;
};

export type NcAction = NcActionReadMainData | NcActionSetDisplayOnMap | NcActionSetDisplayOnMapByDistance;
