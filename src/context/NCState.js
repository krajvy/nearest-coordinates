import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import NCReducer from './NCReducer';
import NCContext from './NCContext';

const NCState = props => {
  const initialState = {
    fileData: '',
  };
  const [state, dispatch] = useReducer(NCReducer, initialState);

  return (
    <NCContext.Provider
      value={{
        state: state,
      }}
    >
      {props.children}
    </NCContext.Provider>
  );
};

NCState.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default NCState;
