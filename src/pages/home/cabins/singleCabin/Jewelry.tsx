import PopUpList from 'components/popUp/PopUp';

import { GEM, SELECTED_PASSIVE, PURSE, STRONG_BOX, GAME_STATE } from 'const';
import { IGameState, ITreasuresState, Keyable } from 'const/custom';
import React, { useContext, useState } from 'react';
import { isArrayLength } from 'utils';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { Context } from 'context/context';
import PassiveArrow from './PassiveArrow';

interface IJewelry {
  carJewelry: ITreasuresState[]
  isUserStillChoosingCard: boolean
}

interface ITreasureList {
  type: string
  Jewelries: ITreasuresState[]
  icon: string
}

const Jewelry: React.FC<IJewelry> = ({ carJewelry, isUserStillChoosingCard }): JSX.Element => {
  const {
    addValueToState,
    gameState
  } = useContext<{
    addValueToState: Keyable
    [GAME_STATE]: IGameState
  }>(Context);
  const { userPassives } = gameState ?? {};
  const [popUpType, setPopUpType] = useState<string>('');
  const ref = useDetectClickOutside({ onTriggered: () => setPopUpType('') });
  const [selectedJewelType, setSelectedJewelType] = useState<string>('');

  const treasureList = [
    {
      type: STRONG_BOX,
      Jewelries: carJewelry.filter((tr) => tr?.treasuresType === STRONG_BOX),
      icon: 'bg-briefCase w-12 h-10'
    },
    {
      type: GEM,
      Jewelries: carJewelry.filter((tr) => tr?.treasuresType === GEM),
      icon: 'bg-gem w-10 h-10'
    },
    {
      type: PURSE,
      Jewelries: carJewelry.filter((tr) => tr?.treasuresType === PURSE),
      icon: 'bg-monyBag w-8 h-10'
    }
  ];

  const selectJewelIdPassive = (jewelId: string): void => {
    addValueToState(SELECTED_PASSIVE, jewelId);
  };

  const jewelClick = (jew: ITreasureList): void => (
    jew.Jewelries.length > 1
      ? setPopUpType(!(popUpType === '') ? '' : jew?.type)
      : (
        selectJewelIdPassive(jew.Jewelries[0]?.id),
        setSelectedJewelType(jew.Jewelries[0]?.treasuresType),
        setPopUpType(''))
  );
  const canClickOnJewel = (jewelId: string): boolean => (!isUserStillChoosingCard && (userPassives?.some(pass => pass?.id === jewelId)));

  const jewelStyles = (i: number, icon: string, jewelId: string): string => {
    const commonStyles = `${icon} bg-cover ${canClickOnJewel(jewelId)
      ? 'cursor-pointer'
      : 'cursor-not-allowed mt-3'} absolute`;
    if (i === 0) return `${commonStyles}  z-10`;
    if (i % 2 === 0) return `${commonStyles}  left-2 bottom-1}`; // to get if it's even
    return `${commonStyles} -left-2 bottom-1}`;
  };

  return (
    <div ref={ref} className='w-full h-14 flex justify-around absolute bottom-0'>
      {treasureList.filter(tr => tr?.Jewelries?.length).map(tr => (
        <div key={tr.type} className="relative w-9">
          <div className='mt-1'>
            {isArrayLength(tr?.Jewelries)
              ? tr?.Jewelries.map((jewel, index) => (
                <div key={jewel?.id}>
                  {canClickOnJewel(jewel?.id) && index === 0 ? <PassiveArrow isArrowEnabled={selectedJewelType === jewel?.treasuresType}/> : null}
                  <div key={jewel?.id} className={jewelStyles(index, tr?.icon, jewel?.id)}
                    onClick={canClickOnJewel(jewel?.id) ? () => jewelClick(tr) : () => {}}/>
                </div>
              ))
              : null}

            <PopUpList isOpen={popUpType === tr?.type}>
              {tr.Jewelries.map((je, index) => (
                <div key={je?.id} className='cursor-pointer hover:bg-sky-700 hover:bg-opacity-20 p-1 rounded-md'
                  onClick={() => {
                    selectJewelIdPassive(je?.id);
                    setSelectedJewelType(je?.treasuresType);
                    setPopUpType('');
                  }}>
                  {`${tr.type} ${index + 1}`}</div>
              ))}
            </PopUpList>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jewelry;
