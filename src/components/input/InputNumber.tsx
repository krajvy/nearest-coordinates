import type { ChangeEvent } from 'react';

import Input from '@/components/input/Input';

export type InputNumberProps = {
  className?: string;
  label?: string;
  min?: number;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  required?: boolean;
  value?: string | string[] | number;
  defaultValue?: string | string[] | number;
};

const InputNumber = ({ className, label, min, name, onChange, pattern, required, value, defaultValue }: InputNumberProps) => {
  const input = (
    <Input
      className={className}
      name={name}
      onChange={onChange}
      pattern={pattern}
      required={required}
      type="number"
      min={min}
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

export default InputNumber;
