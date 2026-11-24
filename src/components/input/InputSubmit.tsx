import styled from 'styled-components';
import type { MouseEventHandler } from 'react';

export type InputSubmitProps = {
  className?: string | undefined;
  disabled?: boolean | undefined;
  onClick?: MouseEventHandler<HTMLInputElement> | undefined;
  value?: string | undefined;
};

const StyledInput = styled.input`
  margin-top: 1em;
  width: 100%;
`;

const InputSubmit = ({ className, disabled, onClick, value }: InputSubmitProps) => {
  return (
    <div>
      <StyledInput
        className={className || undefined}
        disabled={disabled || undefined}
        name="submit"
        onClick={onClick || undefined}
        type="submit"
        value={value || undefined}
      />
    </div>
  );
};

export default InputSubmit;
