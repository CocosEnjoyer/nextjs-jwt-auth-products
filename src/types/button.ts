export interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: BtnType;
  disabled?: boolean;
  classNameProps?: string;
}

type BtnType = 'submit' | 'reset' | 'button';
