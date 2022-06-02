import { SETFILESIN } from './../constants';

const setFilesIn = (payload) => ({
  type: SETFILESIN,
  value: payload.target.value,
  files: payload.target.files,
  payload,
});

export default setFilesIn;
