import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputSubmit = props => {
  return (
    <div>
      <Input
        disabled={props.isLoading}
        name="submit"
        onClick={props.onClick}
        type="submit"
        value={props.value}
      />
    </div>
  );
};

InputSubmit.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default InputSubmit;
