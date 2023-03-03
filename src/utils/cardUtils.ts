import { ICardStates, Keyable } from 'const/custom';
import { isArrayLength } from './generalUtils';

export const uniqCardsWithRepetition = (cards: ICardStates[] | Keyable): any => {
  if (isArrayLength(cards)) {
    const uniqCards: ICardStates[] = [];

    cards.forEach((card: ICardStates) => {
      const isUniq = uniqCards.find(ca => ca?.action === card?.action);
      if (isUniq == null) {
        card.repetition = 1;
        uniqCards.push(card);
      } else {
        isUniq.repetition = ((isUniq?.repetition) != null) ? isUniq.repetition + 1 : 1;
      }
    });
    return uniqCards;
  }
};

const exportedObject = {
  uniqCardsWithRepetition
};

export default exportedObject;
