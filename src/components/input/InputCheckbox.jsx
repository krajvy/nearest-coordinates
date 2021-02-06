import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputCheckbox = props => {
  const input =
    <Input
      name={props.name}
      onChange={props.onChange}
      type="checkbox"
      value={props.value}
    />;

  return (
    <div>
      {props.label ? <label>{props.label}:{input}</label> : <>{input}</>}
    </div>
  );
};

InputCheckbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool,
};

export default InputCheckbox;
