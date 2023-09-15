import { keyNullUndefined } from 'const/custom';
import React from 'react';

interface ISingleRoundSymbol {
  symbol: boolean | undefined
  index: number
  set: number | keyNullUndefined
}

const SingleRoundSymbol: React.FC<ISingleRoundSymbol> = ({ symbol, index, set }): JSX.Element => {
  const symbolSet = index + 1;
  const backGround = (symbol ?? false) ? 'bg-DesertSym' : 'bg-TunnelSym';
  const whiteBackGround = symbolSet === set ? 'bg-white' : '';

  return (
    <div className={`${backGround} ml-3 w-14 h-14 rounded-lg bg-no-repeat bg-cover ${whiteBackGround} border border-white`}/>
  );
};
export default SingleRoundSymbol;
