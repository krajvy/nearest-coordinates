import { createStore, applyMiddleware } from 'redux';

import reducer from './reducer';
import middleware from './middleware';

const store = createStore(
  reducer,
  applyMiddleware(middleware),
);

export default store;
