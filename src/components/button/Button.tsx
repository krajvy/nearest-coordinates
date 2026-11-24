import styled from 'styled-components';

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  name: string;
  onClick?: () => void;
  value: string;
};

const StyledButton = styled.button`
  margin-top: 1em;
  width: 50%;
`;

const Button = ({ className, disabled, name, onClick, value }: ButtonProps) => {
  return (
    <StyledButton
      className={className}
      disabled={disabled}
      name={name}
      onClick={onClick}
      type="button"
    >
      {value}
    </StyledButton>
  );
};

export default Button;
