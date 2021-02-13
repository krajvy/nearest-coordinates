import { SETMAPDISTANCE } from './../constants';

const setMapDistance = payload => ({
  type: SETMAPDISTANCE,
  value: payload.target.value,
  payload,
});

export default setMapDistance;
