import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputText = (props) => {
  const input = (
    <Input
      className={props.className}
      name={props.name}
      onChange={props.onChange}
      pattern={props.pattern}
      required={props.required}
      type="text"
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

InputText.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
};

export default InputText;
