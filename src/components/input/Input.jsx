import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
  const nothing = () => {};
  const onChange = props.onChange || nothing;
  const onClick = props.onClick || nothing;

  return (
    <input
      className={`input input--${props.name}`}
      name={props.name}
      onChange={onChange}
      onClick={onClick}
      required={props.required}
      type={props.type}
      value={props.value}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
};

export default Input;
