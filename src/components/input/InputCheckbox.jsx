import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputCheckbox = (props) => {
  const input = (
    <Input
      checked={props.checked}
      name={props.name}
      onChange={props.onChange}
      type="checkbox"
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

InputCheckbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default InputCheckbox;
