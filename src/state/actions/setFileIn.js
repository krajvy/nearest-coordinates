import { SETFILEIN } from './../constants';

const setFileIn = (payload) => ({
  type: SETFILEIN,
  value: payload.target.value,
  files: payload.target.files,
  payload,
});

export default setFileIn;
