import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputNumber = (props) => {
  const input = (
    <Input
      name={props.name}
      onChange={props.onChange}
      pattern={props.pattern}
      required={props.required}
      type="number"
      min={props.min}
      value={props.value}
    />
  );

  return (
    <div>
      {props.label ? (
        <label>
          {props.label}:{input}
        </label>
      ) : (
        <>{input}</>
      )}
    </div>
  );
};

InputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  min: PropTypes.number,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
};

export default InputNumber;