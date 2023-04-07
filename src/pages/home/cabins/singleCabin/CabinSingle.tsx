import { GAME_STATE, IN, MOVE_DOWN, MOVE_UP, OUT, SELECTED_PASSIVE } from 'const';
import { IGameState, Keyable } from 'const/custom';
import { Context } from 'context/context';
import React, { useContext } from 'react';
import { isArrayLength } from 'utils';
import { isStillChoosingCard } from 'utils/cardUtils';
import Characters from './Characters';
import Jewelry from './Jewelry';
import PassiveArrow from './PassiveArrow';

interface ICabinSingle {
  place: string
  style: string
  position: string
}

const CabinSingle: React.FC<ICabinSingle> = ({ place, style, position }): JSX.Element => {
  const {
    addValueToState,
    gameState,
    selectedPassive
  } = useContext<{
    addValueToState: Keyable
    [GAME_STATE]: IGameState
    [SELECTED_PASSIVE]: string | null
  }>(Context);
  const { roundCard, set, users, cars, userPassives } = gameState ?? {};

  const usersInThisCabin = isArrayLength(users)
    ? users.filter(user => user?.place === place && user?.position === position)
    : [];
  const carJewelry = cars?.[place]?.[position];

  const isUserStillChoosingCard = isStillChoosingCard(roundCard, set);

  const user = users.find(user => !user?.ai);

  const passiveList = userPassives?.filter(passive => passive?.id);

  const isPassiveHaveThisId = (prop: string): boolean => passiveList.some(passive => passive?.id === prop);

  const isPassiveMoveVertical = isPassiveHaveThisId(MOVE_UP) || isPassiveHaveThisId(MOVE_DOWN);

  let passivePosition = '';
  if (isPassiveMoveVertical) {
    passivePosition = isPassiveHaveThisId(MOVE_UP) ? OUT : IN;
  }
  const isCabinPassive = (position === passivePosition && user?.place === place) ||
  (passiveList.some(passive => passive?.id === place) && user?.position === position);

  let passiveId = '';
  if (isCabinPassive && isArrayLength(passiveList)) {
    if (isPassiveMoveVertical) passiveId = passiveList[1]?.id;
    passiveId = place;
  }

  return (
    <div
      className={
        `absolute
      w-44
      h-32
      ${style}
      ${isCabinPassive ? 'cursor-pointer' : 'cursor-not-allowed'}
      `
      }
      onClick={(isCabinPassive && isArrayLength(passiveList)) ? () => addValueToState(SELECTED_PASSIVE, passiveId) : () => {}}
    >
      {isCabinPassive
        ? <div className='absolute w-full'>
          <PassiveArrow isArrowEnabled={selectedPassive === place}/>
        </div>
        : null}

      {isArrayLength(usersInThisCabin)
        ? <div className='flex'>
          {usersInThisCabin.map(user => <Characters key={user?.id} character={user} isUserStillChoosingCard={isUserStillChoosingCard}/>)}
        </div>
        : null}
      {isArrayLength(carJewelry) ? <Jewelry carJewelry={carJewelry} isUserStillChoosingCard={isUserStillChoosingCard}/> : null}
    </div>);
};
export default CabinSingle;
