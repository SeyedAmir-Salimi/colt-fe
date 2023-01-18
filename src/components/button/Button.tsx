import React from 'react';
import { ButtonType } from 'const';

interface IButton {
  label: string | any
  onClick: () => void
  type?: ButtonType
  className?: string
  disabled?: boolean
}

const Button = ({ label, onClick, type, className = '', disabled=false}: IButton): JSX.Element => {
  let btnStyle = 'bg-viola text-white py-2 px-8 w-fit';
  if (type === ButtonType.secondary) btnStyle = 'bg-midGrey text-viola';

  return (
    <button disabled={disabled} className={`${className} ${btnStyle} rounded-md py-2 px-8 w-fit cursor-pointer`} onClick={onClick}>{label}</button>
  );
};

export default Button;
