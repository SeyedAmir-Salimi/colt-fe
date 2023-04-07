import React from 'react';
import { ReactComponent as WantedCard } from '../../../assets/wanted-card.svg';
import { ICardStates, keyNullUndefined } from 'const/custom';
import { allSymbolsStyle, cardActionsLabel, findCardSymbol } from 'const';

interface IPlayCardSingle {
  card: ICardStates | null
  selectedCard?: ICardStates | null
  setSelectedCard?: (event: ICardStates | null) => void
  cardExtraStyle?: string
}

const PlayCardSingle: React.FC<IPlayCardSingle> = ({ card, selectedCard, setSelectedCard, cardExtraStyle }): JSX.Element => {
  const repitition = card?.repetition ?? 0;

  const cardSymbol = (el: { pos: string | keyNullUndefined, classStyle: string | keyNullUndefined }): React.ReactNode => (
    <h1 key={el?.pos} className={`absolute bg-midGrey rounded-lg text-black text-2xl ${el?.classStyle ?? ''}`}>{findCardSymbol(card?.action)}</h1>
  );

  const cardLabel = cardActionsLabel[((card?.action) != null) ? card?.action : ''];
  return (
    <div>
      <div className={`relative text-center  ${cardExtraStyle ?? ''}`} onClick={(setSelectedCard != null) ? () => setSelectedCard(card) : () => {}}>
        <WantedCard className='ml-3 w-40 h-52 cursor-pointer fill-darkGrey' ></WantedCard>
        <h1 className='absolute top-[45%] w-full text-2xl cursor-pointer font-west'>{cardLabel}</h1>
        {allSymbolsStyle.map(sy => cardSymbol(sy))}
        <h1 className={'absolute -top-6  w-full text-2xl text-midGrey  cursor-pointer font-bold'}>{repitition > 1 ? `X${repitition}` : null}</h1>
      </div>
    </div>
  );
};
export default PlayCardSingle;
