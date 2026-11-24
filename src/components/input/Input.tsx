import type { ChangeEvent, MouseEvent } from 'react';
import styled from 'styled-components';

export type InputProps = {
  className?: string | undefined;
  disabled?: boolean | undefined;
  checked?: boolean | undefined;
  min?: number | undefined;
  multiple?: boolean | undefined;
  name: string;
  onChange?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onClick?: ((event: MouseEvent<HTMLInputElement>) => void) | undefined;
  pattern?: string | undefined;
  required?: boolean | undefined;
  type: 'checkbox' | 'file' | 'number' | 'text';
  accept?: string | undefined;
  value?: string | string[] | number | undefined;
  defaultValue?: string | string[] | number | undefined;
};

const StyledInput = styled.input`
  margin: 0.2em 0 0.6em;
  width: calc(100% - 0.6em);

  &:invalid {
    background-color: lightpink;
  }
  &:valid {
    background-color: palegreen;
  }
`;

const Input = ({ checked, className, disabled, name, multiple, min, onChange, onClick, pattern, required, type, value, defaultValue, accept }: InputProps) => {
  const checkedValue = typeof checked === 'boolean' ? checked : undefined;
  const disabledValue = typeof disabled === 'boolean' ? disabled : undefined;
  const multipleValue = typeof multiple === 'boolean' ? multiple : undefined;
  const requiredValue = typeof required === 'boolean' ? required : undefined;

  return (
    <StyledInput
      checked={checkedValue}
      className={className || undefined}
      disabled={disabledValue}
      name={name}
      multiple={multipleValue}
      min={min || undefined}
      onChange={onChange || undefined}
      onClick={onClick || undefined}
      pattern={pattern || undefined}
      required={requiredValue}
      type={type}
      value={value || undefined}
      defaultValue={defaultValue || undefined}
      accept={accept || undefined}
    />
  );
};

export default Input;
