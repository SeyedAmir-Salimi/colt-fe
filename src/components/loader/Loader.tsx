import { FIXED_SIZE } from 'const';
import React from 'react';

interface ILoader {
  isSpinning: boolean
}

const Loader: React.FC<ILoader> = ({ isSpinning }): JSX.Element => {
  return (
    <>
      {isSpinning
        ? <div className={`${FIXED_SIZE} absolute z-20`}>
          <div className={'bg-spritSpinner w-96 h-96 bg-no-repeat relative top-1/3 left-1/3'}/>
        </div>
        : null}
    </>
  );
};
export default Loader;
