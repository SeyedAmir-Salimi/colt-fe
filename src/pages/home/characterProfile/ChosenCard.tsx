import React from 'react';
import { ReactComponent as WantedCard } from '../../../assets/wanted-card.svg';
import { ICardStates, keyNullUndefined } from 'const/custom';
import { findCardSymbol, twoSymbolsStyle } from 'const';

interface IChosenCard {
  card: ICardStates | null
}

const ChosenCard: React.FC<IChosenCard> = ({ card }): JSX.Element => {
  const cardSymbol = (el: { pos: string | keyNullUndefined, classStyle: string | keyNullUndefined }): React.ReactNode => (
    <h1 key={el?.pos} className={`absolute bg-midGrey rounded-lg text-black text-2xl ${el?.classStyle ?? ''}`}>{findCardSymbol(card?.action)}</h1>
  );

  return (
    <div className='relative text-center' >
      <WantedCard className='ml-3 w-20 h-32 cursor-pointer fill-darkGrey' />
      {twoSymbolsStyle.map(two => cardSymbol(two))}
    </div>
  );
};
export default ChosenCard;
