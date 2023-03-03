import { GAME_STATE } from 'const';
import { ICardStates, IGameState } from 'const/custom';
import { Context } from 'context/context';
import React, { useContext } from 'react';
import { isItEmpty } from 'utils';
import { uniqCardsWithRepetition } from 'utils/cardUtils';
import PlayCardSingle from './PlayCardSingle';

interface IPlayCardS {
  selectedCard: ICardStates | null
  setSelectedCard: (event: ICardStates | null) => void

}

const PlayCards: React.FC<IPlayCardS> = ({ selectedCard, setSelectedCard }): JSX.Element => {
  const { gameState } = useContext<{ [GAME_STATE]: IGameState }>(Context);
  const { users } = gameState ?? {};
  const userCards = users?.find((el: { ai: boolean }) => !el?.ai)?.handCards;
  const uniqCards = uniqCardsWithRepetition(userCards);

  return (
    <div className='absolute bottom-0 flex p-2 right-5'>{
      (uniqCards != null) && !isItEmpty(uniqCards)
        ? uniqCards.map((rc: ICardStates) => (
          <PlayCardSingle
            card={rc}
            key={rc?.id}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />))
        : null}</div>
  );
};
export default PlayCards;
