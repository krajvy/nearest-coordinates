import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-top: 1em;
  width: 50%;
`;

const Button = (props) => {
  return (
    <StyledButton
      className={props.className}
      disabled={props.disabled}
      name={props.name}
      onClick={props.onClick}
      type="button"
    >
      {props.value}
    </StyledButton>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default Button;
