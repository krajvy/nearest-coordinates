import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import NCReducer from './NCReducer';
import NCContext from './NCContext';

const NCState = props => {
  const initialState = {
    coordIn: '',
    fileIn: '',
    fileInList: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(NCReducer, initialState);

  const setCoordIn = event => {
    dispatch({
      type: 'SETCOORDIN',
      value: event.target.value,
    });
  };
  const setFileIn = event => {
    dispatch({
      type: 'SETFILEIN',
      value: event.target.value,
      files: event.target.files,
    });
  };
  const readData = () => {
    dispatch({
      type: 'READDATA',
    });
  };

  return (
    <NCContext.Provider
      value={{
        state: state,
        setCoordIn: setCoordIn,
        setFileIn: setFileIn,
        readData: readData,
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
