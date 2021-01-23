import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputSubmit = props => {
  return (
    <div>
      <Input
        name="submit"
        onClick={props.onClick}
        type="submit"
        value={props.value}
      />
    </div>
  );
};

InputSubmit.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default InputSubmit;
