import api from 'api/api';
import defaultQueryProps from 'api/configs';
import Button from 'components/button/Button';
import Cabins from 'components/cabins/Cabins';
import CharacterProfile from 'components/characterProfile/CharacterProfile';
import PlayCards from 'components/playCards/PlayCards';
import RoundCardSymbols from 'components/roundCardSymbols/RoundCardSymbols';
import { ButtonType, FIXED_SIZE, GAME_STATE, MARSHAL } from 'const';
import { ICardStates, ICharacter, Keyable } from 'const/custom';
import { Context } from 'context/context';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { isArrayLength, isItEmpty } from 'utils';

const Home: React.FC = (): JSX.Element => {
  const {
    addValueToState
  } = useContext<{
    addValueToState: Keyable
  }>(Context);
  const { id: gameId } = useParams();
  const [selectedCard, setSelectedCard] = useState<ICardStates | null>(null);

  const { data: gameState } = useQuery(
    ['getGameState@HomePage', gameId],
    async (): Promise<Keyable> => {
      const res = await api.getGameState(gameId);
      addValueToState(GAME_STATE, res);
      return res;
    },
    {
      ...defaultQueryProps,
      enabled: Boolean(gameId)
    }
  );
  const { users, roundCard, round } = gameState ?? {};
  const backGround = ((Boolean(roundCard)) && isArrayLength(roundCard?.tunnelSituation) &&
  (!Boolean((roundCard.tunnelSituation?.[round - 1]))))
    ? 'bg-TrainWestTunnel'
    : 'bg-TrainWest';

  return (
    <div className={`${FIXED_SIZE} ${backGround} relative`}>
      {!isItEmpty(users)
        ? <div className='flex justify-evenly'>
          {users.filter((user: ICharacter) => user?.nameOfCharacter !== MARSHAL).map((user: ICharacter) => (
            <CharacterProfile key={user?.id} character={user}/>))}
        </div>
        : null
      }
      <div className='absolute ml-7 bottom-4'>
        <Button
          label={
            <div className={'flex items-center'}>
              <p className='mr-2 font-west text-3xl'>chose card</p>
            </div>}
          type={Boolean(selectedCard) ? ButtonType.secondary : ButtonType.primary}
          onClick={() => {}}
          disabled={!!Boolean(selectedCard)}
          className={`${Boolean(selectedCard) ? 'cursor-not-allowed' : 'cursor-pointer'}`
          }
        />
      </div>
      <RoundCardSymbols/>
      <PlayCards selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
      <Cabins/>
    </div>
  );
};
export default Home;
