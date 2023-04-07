import { ICardStates, IRoundCards, Keyable, keyNullUndefined } from 'const/custom';
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
export const isStillChoosingCard = (roundCard: null | IRoundCards, set: number | keyNullUndefined): boolean => (
  roundCard?.tunnelSituation?.length !== ((set ?? 1) - 1));

export const isInTunnel = (roundCard: null | IRoundCards, set: number | keyNullUndefined): boolean => isArrayLength(roundCard?.tunnelSituation ?? []) &&
 !Boolean((roundCard?.tunnelSituation?.[(set ?? 1) - 1]));

const exportedObject = {
  isStillChoosingCard,
  uniqCardsWithRepetition
};

export default exportedObject;
