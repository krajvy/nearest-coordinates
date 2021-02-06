import { SETDISPLAYONMAP } from './../constants';

const setDisplayOnMap = (payload, index) => ({
  type: SETDISPLAYONMAP,
  index,
  payload,
});

export default setDisplayOnMap;
