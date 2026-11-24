import type { ChangeEvent } from 'react';

import Input from '@/components/input/Input';

export type InputTextProps = {
  className?: string;
  label?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  required?: boolean;
  value?: string | number;
  defaultValue?: string | number;
};

const InputText = ({ className, label, name, onChange, pattern, required, value, defaultValue }: InputTextProps) => {
  const input = (
    <Input
      className={className}
      name={name}
      onChange={onChange}
      pattern={pattern}
      required={required}
      type="text"
      value={value}
      defaultValue={defaultValue}
    />
  );

  return (
    <div>
      {label ? (
        <label>
          {label}:{input}
        </label>
      ) : (
        <>{input}</>
      )}
    </div>
  );
};

export default InputText;
