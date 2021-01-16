import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import Button from '../button/Button';

function InputFile (props) {
  const input =
        <Input
          name={props.name}
          type="file"
        />;

  return (
    <>
      <div>
        {props.label ? <label>{props.label}:{input}</label> : { input }}
        <Button
          name="abort"
          value="Cancel read"
        />
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
}

InputFile.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default InputFile;
