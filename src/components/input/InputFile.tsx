import type { ChangeEvent } from 'react';

import Input from '@/components/input/Input';

export type InputFileProps = {
  accept?: string;
  className?: string;
  label?: string;
  multiple?: boolean;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string[] | string;
  defaultValue?: string[] | string;
};

const InputFile = ({ className, label, multiple, name, onChange, required, value, defaultValue, accept }: InputFileProps) => {
  const input = (
    <Input
      className={className}
      multiple={multiple}
      name={name}
      onChange={onChange}
      required={required}
      type="file"
      accept={accept}
      value={value}
      defaultValue={defaultValue}
    />
  );

  return (
    <>
      <div>
        {label ? (
          <label>
            {label}:{input}
          </label>
        ) : (
          <>{input}</>
        )}
      </div>
    </>
  );
};

export default InputFile;
