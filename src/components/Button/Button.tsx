import styles from './Button.module.scss';
import { ButtonProps } from '@/types/button';

export function Button({ text, type, disabled, onClick, classNameProps }: ButtonProps) {
  return (
    <button
      className={classNameProps ? classNameProps : styles.btn}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
