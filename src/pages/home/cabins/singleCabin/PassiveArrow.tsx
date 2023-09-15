import React from 'react';
import { FaArrowAltCircleDown } from 'react-icons/fa';

interface IPassiveArrow {
  isArrowEnabled?: boolean
}

const PassiveArrow: React.FC<IPassiveArrow> = ({ isArrowEnabled = false }): JSX.Element => {
  return (<span className='flex justify-center'><FaArrowAltCircleDown className={isArrowEnabled ? 'text-green-700' : 'text-viola'}/></span>);
};
export default PassiveArrow;
