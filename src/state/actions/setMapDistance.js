import { SETMAPDISTANCE } from './../constants';

const setMapDistance = payload => ({
  type: SETMAPDISTANCE,
  value: parseInt(payload.target.value, 10),
  payload,
});

export default setMapDistance;
