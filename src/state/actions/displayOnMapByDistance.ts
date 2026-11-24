import { NcActionsEnum } from '@/constants';
import type { NcContextType } from '@/types';

const displayOnMapByDistance = (formData: FormData, dispatch: NcContextType['dispatch']) => {
  const formDistance = Number(formData.get('map_range'));

  const distance = formDistance < 1 ? 1 : formDistance;

  dispatch({ type: NcActionsEnum.SetDisplayOnMapByDistance, payload: { distance } });
};

export default displayOnMapByDistance;