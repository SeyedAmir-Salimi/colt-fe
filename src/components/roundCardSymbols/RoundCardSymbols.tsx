import { GAME_STATE } from 'const'
import { IGameState } from 'const/custom'
import { Context } from 'context/context'
import React, { useContext } from 'react'
import { isItEmpty } from 'utils'
import SingleRoundSymbol from './SingleRoundSymbol'


const RoundCardSymbols: React.FC = (): JSX.Element => {
  const { gameState } = useContext<{[GAME_STATE]: IGameState}>(Context);
    const {roundCard, round } = gameState ?? {}
    const {tunnelSituation} = roundCard ?? {}

    return (
    <div className='absolute bottom-20 p-2'>
      <div className='ml-5 text-midGrey text-2xl font-bold flex'>
        <h1 className='mt-1 font-west'>Round:</h1>
        <h1 className='ml-2'>{round}</h1>
      </div>
      <div className='flex p-2'>
        {tunnelSituation && !isItEmpty(tunnelSituation) ?
          tunnelSituation.map((rc, index)=> ( 
          <SingleRoundSymbol symbol={rc} index={index} key={index} set={gameState?.set}/>))
          : null}</div>
      </div>
      )
}
export default RoundCardSymbols
