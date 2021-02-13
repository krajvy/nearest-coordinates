import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  return (
    <button
      className={`btn btn--${props.name}`}
      disabled={props.disabled}
      name={props.name}
      type="button"
    >
      {props.value}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Button;
