import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  margin-top: 1em;
  width: 100%;
`;

const InputSubmit = (props) => {
  return (
    <div>
      <StyledInput
        className={props.className}
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
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default InputSubmit;
