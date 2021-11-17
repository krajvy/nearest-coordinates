import { ERROROCCURED } from './../constants';

const handleError = (payload) => ({ type: ERROROCCURED, payload });

export default handleError;
