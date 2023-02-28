import { GAME_STATE } from 'const';
import { IGameState } from 'const/custom';
import { Context } from 'context/context';
import React, { useContext } from 'react'
import { isArrayLength } from 'utils';
import Characters from './Characters'
import Jewelry from './Jewelry'

interface ICabinSingle {
  place: string,
  style: string,
  position: string,
}

const CabinSingle: React.FC<ICabinSingle> = ({place, style, position}): JSX.Element => {
  const { gameState } = useContext<{[GAME_STATE]: IGameState}>(Context);

  const usersInThisCabin = isArrayLength(gameState?.users) ? 
    gameState?.users.filter(user=> user?.place === place && user?.position === position)
    : []
  const carJewelry = gameState?.cars?.[place]?.[position]

    return (
    <div 
      className={
      `absolute
      w-44
      h-32
      ${style}
      `
      }>
        {isArrayLength(usersInThisCabin) ?
        <div className='flex'>
          {usersInThisCabin.map(user=> <Characters key={user?.id} {...user}/>)}
        </div> 
        : null}
        {isArrayLength(carJewelry) ?
          <Jewelry carJewelry={carJewelry}/>
        : null}
      </div>)
}
export default CabinSingle
