import { DATACOMPLETE } from './../constants';

const dataComplete = (payload) => ({
  type: DATACOMPLETE,
  value: payload,
  payload,
});

export default dataComplete;
