import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  return (
    <button
      className={`btn btn--${props.name}`}
      disabled={props.disabled}
      name={props.name}
      onClick={props.onClick}
      type="button"
    >
      {props.value}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default Button;
