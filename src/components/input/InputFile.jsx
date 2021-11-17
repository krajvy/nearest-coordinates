import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputFile = (props) => {
  const input = (
    <Input
      multiple={props.multiple}
      name={props.name}
      onChange={props.onChange}
      required={props.required}
      type="file"
      value={props.value}
    />
  );

  return (
    <>
      <div>
        {props.label ? (
          <label>
            {props.label}:{input}
          </label>
        ) : (
          <>{input}</>
        )}
      </div>
    </>
  );
};

InputFile.propTypes = {
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputFile;
