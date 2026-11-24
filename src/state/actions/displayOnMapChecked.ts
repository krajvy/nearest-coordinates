import { NcActionsEnum } from '@/constants';
import type { NcContextType, DataRowBase } from '@/types';

const displayOnMapChecked = (rowId: DataRowBase['rowId'], dispatch: NcContextType['dispatch']) => {
  dispatch({ type: NcActionsEnum.SetDisplayOnMap, payload: { rowId } });
};

export default displayOnMapChecked;
