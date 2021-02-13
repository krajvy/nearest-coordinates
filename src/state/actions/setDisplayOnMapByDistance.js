import { SETDISPLAYONMAPBYDISTANCE } from './../constants';

const setDisplayOnMapByDistance = payload => ({
  type: SETDISPLAYONMAPBYDISTANCE,
  payload,
});

export default setDisplayOnMapByDistance;
