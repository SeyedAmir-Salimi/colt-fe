import React from 'react';
import { ButtonType } from 'const';

interface IButton {
  label: string | React.ReactNode
  onClick: () => void
  type?: ButtonType
  className?: string
  disabled?: boolean
}
const primaryStyle = 'bg-viola text-white';
const secondaryStyle = 'bg-midGrey text-viola';

const Button = ({ label, onClick, type = ButtonType.primary, className = '', disabled = false }: IButton): JSX.Element => {
  let btnStyle = '';
  if (type === ButtonType.primary) btnStyle = primaryStyle;
  if (type === ButtonType.secondary) btnStyle = secondaryStyle;
  const disabledStyle = disabled ? `${secondaryStyle} cursor-not-allowed` : 'cursor-pointer';

  return (
    <button disabled={disabled} className={`${className} ${disabledStyle} ${btnStyle} rounded-md py-2 px-8 w-fit`} onClick={onClick}>{label}</button>
  );
};

export default Button;
