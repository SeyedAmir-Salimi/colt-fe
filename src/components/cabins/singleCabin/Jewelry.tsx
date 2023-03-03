import PopUpList from 'components/popUp/PopUp';

import { GEM, SELECTED_PASSIVE, PURSE, STRONG_BOX } from 'const';
import { ITreasuresState, Keyable } from 'const/custom';
import React, { useContext, useState } from 'react';
import { isArrayLength } from 'utils';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { Context } from 'context/context';

interface IJewelry {
  carJewelry: ITreasuresState[]
}

interface ITreasureList {
  type: string
  Jewelries: ITreasuresState[]
  icon: string
}

const Jewelry: React.FC<IJewelry> = ({ carJewelry }): JSX.Element => {
  const {
    addValueToState
  } = useContext<{
    addValueToState: Keyable
  }>(Context);

  const [popUpType, setPopUpType] = useState<string>('');
  const ref = useDetectClickOutside({ onTriggered: () => setPopUpType('') });

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
    jew.Jewelries.length > 1 ? setPopUpType(!(popUpType === '') ? '' : jew?.type) : (selectJewelIdPassive(jew.Jewelries[0]?.id), setPopUpType(''))
  );

  const jewelStyles = (i: number, icon: string): string => {
    const commonStyles = `${icon} bg-cover cursor-pointer absolute`;
    if (i === 0) return `${commonStyles}  z-10`;
    if (i % 2 === 0) return `${commonStyles}  left-2 bottom-1}`;
    return `${commonStyles} -left-2 bottom-1}`;
  };

  return (
    <div ref={ref} className='w-full h-10 flex justify-around absolute bottom-0'>
      {treasureList.filter(tr => tr?.Jewelries?.length).map(tr => (
        <div key={tr.type} className="relative">

          {isArrayLength(tr?.Jewelries)
            ? tr?.Jewelries.map((jewel, index) => (
              <div key={jewel?.id}>
                <div key={jewel?.id} className={jewelStyles(index, tr?.icon)}
                  onClick={() => jewelClick(tr)}/>
              </div>
            ))
            : null}

          <PopUpList isOpen={popUpType === tr?.type}>
            {tr.Jewelries.map((je, index) => (
              <div key={je?.id} className='cursor-pointer hover:bg-sky-700 hover:bg-opacity-20 p-1 rounded-md'
                onClick={() => {
                  selectJewelIdPassive(je?.id);
                  setPopUpType('');
                }}>{`${tr.type} ${index + 1}`}</div>
            ))}
          </PopUpList>
        </div>
      ))}
    </div>
  );
};

export default Jewelry;
