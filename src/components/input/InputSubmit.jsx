import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const InputSubmit = props => {
  return (
    <div>
      <Input
        name="submit"
        type="submit"
        value={props.value}
      />
    </div>
  );
};

InputSubmit.propTypes = {
  value: PropTypes.string,
};

export default InputSubmit;
