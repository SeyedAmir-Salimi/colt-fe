
import { characterImages, GAME_STATE, SELECTED_PASSIVE } from 'const';
import { ICharacter, IGameState, Keyable } from 'const/custom';
import { Context } from 'context/context';
import React, { useContext } from 'react';
import PassiveArrow from './PassiveArrow';

interface ICabinCharacters {
  character: ICharacter
  isUserStillChoosingCard: boolean
}

const Characters: React.FC<ICabinCharacters> = ({ character, isUserStillChoosingCard }): JSX.Element => {
  const {
    addValueToState,
    selectedPassive,
    gameState
  } = useContext<{
    addValueToState: Keyable
    [GAME_STATE]: IGameState
    [SELECTED_PASSIVE]: string | null
  }>(Context);
  const { userPassives } = gameState ?? {};
  const selectCharacterIdPassive = (characterId: string): void => {
    addValueToState(SELECTED_PASSIVE, characterId);
  };

  const canSelectCharacter = !isUserStillChoosingCard && userPassives?.some(pass => pass?.id === character?.id);
  const characterBgImage = characterImages[character?.nameOfCharacter];

  return (
    <div>
      {canSelectCharacter ? <PassiveArrow isArrowEnabled={selectedPassive === character?.id}/> : null}
      <div className={`${characterBgImage} w-14 h-28 bg-cover ${canSelectCharacter ? 'cursor-pointer mt-0' : 'cursor-not-allowed mt-4'}`}
        onClick={canSelectCharacter ? () => selectCharacterIdPassive(character?.id) : () => {}}/>
    </div>
  );
};
export default Characters;
