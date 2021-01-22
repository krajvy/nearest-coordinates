import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputText = props => {
  const input =
        <Input
          name={props.name}
          type="text"
        />;

  return (
    <div>
      {props.label ? <label>{props.label}:{input}</label> : { input }}
    </div>
  );
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default InputText;
