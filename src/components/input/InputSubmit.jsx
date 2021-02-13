import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputSubmit = props => {
  return (
    <div>
      <Input
        disabled={props.disabled}
        name="submit"
        onClick={props.onClick}
        type="submit"
        value={props.value}
      />
    </div>
  );
};

InputSubmit.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default InputSubmit;
