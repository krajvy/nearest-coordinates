import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
  return (
    <input
      className={`input input--${props.name}`}
      name={props.name}
      type={props.type}
      value={props.value}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
};

export default Input;
