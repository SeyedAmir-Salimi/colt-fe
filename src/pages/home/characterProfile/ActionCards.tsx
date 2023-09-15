import { CHEYENNE, findCardSymbol, GAME_STATE, MARSHAL, THREE_MORE } from 'const';
import { IAction, ICharacter, IGameState } from 'const/custom';
import { Context } from 'context/context';
import React, { useState, useContext } from 'react';
import { getMax, isArrayLength } from 'utils';
import { ReactComponent as WantedCard } from '../../../assets/wanted-card.svg';

interface IActionCards {
  character: ICharacter
}

interface ISingleActionCards {
  actionCardInfo: IAction
  backColor?: string | null
}

const ActionCards: React.FC<IActionCards> = ({ character }): JSX.Element => {
  const [isOpenActions, setIsOpenActions] = useState<boolean>(false);
  const { gameState } = useContext<{ [GAME_STATE]: IGameState }>(Context);
  const { actionState, minSet } = gameState ?? {};
  const characterActionCards = actionState?.filter(ac => (ac?.active === character?.nameOfCharacter) || (ac?.passive === character?.nameOfCharacter && ac?.active === MARSHAL)); ;
  const maxRound = getMax(characterActionCards, (x: { round: number }) => x?.round);
  const lastActions = characterActionCards.filter(lac => lac?.round === maxRound && lac?.set === (Number(minSet) - 1));
  if (character?.nameOfCharacter === CHEYENNE) console.log('characterActionCards', { characterActionCards, maxRound });

  const SingleActionCard: React.FC<ISingleActionCards> = ({ actionCardInfo, backColor }): JSX.Element => {
    const isThreeMore = actionCardInfo?.action === THREE_MORE;
    const backgroundColor = backColor ?? 'fill-orange';
    return (
      <div className='relative text-center'>
        <WantedCard className={`w-20 h-32 ${backgroundColor}`} />
        <div className='absolute top-8 w-full'>
          <h1 className='text-xs'>{actionCardInfo?.active}</h1>
          <div className='text-2xl flex justify-center mt-1'><div>{findCardSymbol(actionCardInfo?.action)}</div></div>
          <h1 className='text-xs'>{!isThreeMore ? actionCardInfo?.passive : ''}</h1>
        </div>
      </div>
    );
  };

  return (
    <div className='ml-6'>
      {isArrayLength(lastActions)
        ? <div>
          {!isOpenActions ? <div className={`z-10 absolute ${lastActions.length > 1 ? 'cursor-pointer' : ''}`} onClick={() => setIsOpenActions(true)}><SingleActionCard actionCardInfo={lastActions[0]}/></div> : null}
          {(!isOpenActions && lastActions.length > 1) ? <div className='absolute top-2 left-4'><SingleActionCard backColor='black' actionCardInfo={lastActions[1]}/></div> : null}
          {isOpenActions
            ? lastActions.map((lac) => (
              <div key={lac?.id}
                className='cursor-pointer'
                onClick={() => setIsOpenActions(false)}
              ><SingleActionCard actionCardInfo={lac}/></div>
            ))
            : null}
        </div>
        : null
      }
    </div>
  );
};
export default ActionCards;
