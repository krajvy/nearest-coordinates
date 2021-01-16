import React from 'react';
import PropTypes from 'prop-types';

function Button (props) {
  return (
    <button
      className={`btn btn--${props.name}`}
      name={props.name}
      type="button"
    >
      {props.value}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};

export default Button;
