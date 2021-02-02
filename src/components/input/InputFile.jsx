import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputFile = props => {
  const input =
        <Input
          name={props.name}
          onChange={props.onChange}
          required={props.required}
          type="file"
          value={props.value}
        />;

  return (
    <>
      <div>
        {props.label ? <label>{props.label}:{input}</label> : { input }}
      </div>
      <div>
        <label>
          Readed:
          <span className="file_progressbar_wrapper">
            <span className="file_progressbar">&nbsp;</span>
          </span>
          <span className="file_progressbar_counter">0%</span>
        </label>
      </div>
    </>
  );
};

InputFile.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputFile;
