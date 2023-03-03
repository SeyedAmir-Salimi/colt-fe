import React from 'react';
import { ReactComponent as WantedCard } from '../../assets/wanted-card.svg';
import { ICardStates, keyNullUndefined } from 'const/custom';
import { allSymbolsStyle, charactersColors, findCardSymbol } from 'const';

interface IPlayCardSingle {
  card: ICardStates
  selectedCard: ICardStates | null
  setSelectedCard: (event: ICardStates | null) => void

}

const PlayCardSingle: React.FC<IPlayCardSingle> = ({ card, selectedCard, setSelectedCard }): JSX.Element => {
  const repitition = card?.repetition !== 1 ? card?.repetition : 0;
  const selectedCardStyle = selectedCard?.id === card?.id ? 'mt-10' : 'mt-20';
  const fillColor = charactersColors[card?.owner];

  const cardSymbol = (el: { pos: string | keyNullUndefined, classStyle: string | keyNullUndefined }): React.ReactNode => (
    <h1 key={el?.pos} className={`absolute bg-midGrey rounded-lg text-black text-2xl ${el?.classStyle ?? ''}`}>{findCardSymbol(card?.action)}</h1>
  );

  return (
    <div>
      <div className={`relative text-center  ${selectedCardStyle}`} onClick={() => setSelectedCard(card)}>
        <WantedCard style={{ fill: fillColor }} className={'ml-3 w-40 h-52 cursor-pointer'}></WantedCard>
        <h1 className='absolute top-[45%] w-full text-2xl cursor-pointer font-west'>{card?.action}</h1>
        {allSymbolsStyle.map(sy => cardSymbol(sy))}
        <h1 className={'absolute -top-6  w-full text-2xl text-midGrey  cursor-pointer font-bold'}>{(repitition != null) ? `X${repitition}` : 'null'}</h1>
      </div>
    </div>
  );
};
export default PlayCardSingle;
