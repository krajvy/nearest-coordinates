import { useFormStatus } from 'react-dom';
import InputSubmit from '@/components/input/InputSubmit';

export type SubmitButtonProps = {
  className?: string;
  value?: string;
  valuePending?: string;
};

const SubmitButton = ({ className, value, valuePending }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <InputSubmit
      className={className}
      disabled={pending || false}
      value={pending ? valuePending : value}
    />
  );
};

export default SubmitButton;
