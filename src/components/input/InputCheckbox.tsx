import type { ChangeEvent } from 'react';

import Input from '@/components/input/Input';

export type InputCheckboxProps = {
  checked?: boolean;
  value?: string;
  label?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputCheckbox = ({ checked, value, label, name, onChange }: InputCheckboxProps) => {
  const input = (
    <Input
      checked={checked}
      value={value}
      name={name}
      onChange={onChange}
      type="checkbox"
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

export default InputCheckbox;
