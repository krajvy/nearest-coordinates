import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
  const onChange = props.onChange || (() => {});

  return (
    <input
      className={`input input--${props.name}`}
      name={props.name}
      onChange={onChange}
      type={props.type}
      value={props.value}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
};

export default Input;
