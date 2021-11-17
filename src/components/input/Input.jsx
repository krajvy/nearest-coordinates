import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  margin: 0.2em 0 0.6em;
  width: calc(100% - 0.6em);
`;

const Input = (props) => {
  return (
    <StyledInput
      checked={props.checked}
      disabled={props.disabled}
      name={props.name}
      multiple={props.multiple}
      min={props.min}
      onChange={props.onChange}
      onClick={props.onClick}
      pattern={props.pattern}
      required={props.required}
      type={props.type}
      value={props.value}
    />
  );
};

Input.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  min: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
};

export default Input;
