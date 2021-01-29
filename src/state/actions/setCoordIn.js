import { SETCOORDIN } from './../constants';

const setCoordIn = payload => ({
  type: SETCOORDIN,
  value: payload.target.value,
  payload,
});

export default setCoordIn;
