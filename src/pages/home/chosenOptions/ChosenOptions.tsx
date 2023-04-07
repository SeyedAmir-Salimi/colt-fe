import Button from 'components/button/Button';
import { ButtonType, GAME_STATE, SELECTED_PASSIVE } from 'const';
import { IGameState, Keyable } from 'const/custom';
import { Context } from 'context/context';
import React, { useContext } from 'react';
import { isArrayLength } from 'utils';
import PlayCardSingle from '../playCards/PlayCardSingle';

interface IChosenOptions {
  createChooseActionOptionCard: () => void
}

const ChosenOptions: React.FC<IChosenOptions> = ({ createChooseActionOptionCard }): JSX.Element => {
  const {
    addValueToState,
    gameState,
    selectedPassive
  } = useContext<{
    addValueToState: Keyable
    [GAME_STATE]: IGameState
    [SELECTED_PASSIVE]: string | null
  }>(Context);
  const { users, minSet, userPassives } = gameState ?? {};
  const userChosenCards = users?.find(user => !user?.ai);
  const userThisSetChosenCard = userChosenCards?.chosenCards?.find(card => card?.set === minSet);

  return (
    <div>
      {isArrayLength(userPassives)
        ? <div>
          <div className='absolute bottom-60 right-10'>
            <Button
              label='Please chose your action'
              onClick={() => createChooseActionOptionCard()}
              type={!Boolean(selectedPassive) ? ButtonType.secondary : ButtonType.primary}
              disabled={!Boolean(selectedPassive)}
            />
          </div>
          <div className='absolute bottom-6 right-10 flex'>
            <div>
              {userPassives.map(pa =>
                <p
                  className={`rounded-lg p-2 bg-viola mt-2 text-white cursor-pointer ${selectedPassive === pa?.id ? 'border border-yellow-300' : ''}`}
                  key={pa?.id}
                  onClick={() => addValueToState(SELECTED_PASSIVE, pa?.id)}
                >
                  {pa?.name ?? pa?.treasuresType ?? pa?.id}
                </p>)
              }
            </div>
            {(userThisSetChosenCard != null) ? <PlayCardSingle card={userThisSetChosenCard}/> : null}
          </div>
        </div>
        : null }
    </div>
  );
};
export default ChosenOptions;
