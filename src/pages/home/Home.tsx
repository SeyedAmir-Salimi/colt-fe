import api from 'api/api';
import defaultQueryProps from 'api/configs';
import Button from 'components/button/Button';
import Cabins from 'components/cabins/Cabins';
import CharacterProfile from 'components/characterProfile/CharacterProfile';
import PlayCards from 'components/playCards/PlayCards';
import RoundCardSymbols from 'components/roundCardSymbols/RoundCardSymbols';
import { ButtonType, FIXED_SIZE, GAME_STATE, MARSHAL } from 'const';
import { ICardStates, ICharacter, ICreateChooseCard, Keyable } from 'const/custom';
import { Context } from 'context/context';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { isArrayLength, isItEmpty } from 'utils';
import { isStillChoosingCard } from 'utils/cardUtils';

const Home: React.FC = (): JSX.Element => {
  const {
    addValueToState
  } = useContext<{
    addValueToState: Keyable
  }>(Context);
  const { id: gameId } = useParams();
  const [selectedCard, setSelectedCard] = useState<ICardStates | null>(null);
  const [isTakeCardFromDeck, setIsTakeCardFromDeck] = useState<boolean>(false);

  const { data: gameState, refetch: fetchGameState } = useQuery(
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
  const { users, roundCard, set } = gameState ?? {};

  const isShowChoseCardButton = isStillChoosingCard(roundCard, set);

  const backGround = (isArrayLength(roundCard?.tunnelSituation) && isShowChoseCardButton &&
  (!Boolean((roundCard.tunnelSituation?.[set - 1]))))
    ? 'bg-TrainWestTunnel'
    : 'bg-TrainWest';

  const buttonSettings = {
    type: !Boolean(selectedCard) ? ButtonType.secondary : ButtonType.primary,
    disabled: !Boolean(selectedCard),
    className: !Boolean(selectedCard) ? 'cursor-not-allowed' : 'cursor-pointer'
  };

  const { refetch: createChooseCard } = useQuery(
    ['createChooseCard@HomePage', isTakeCardFromDeck],
    async (): Promise<Keyable> => {
      const body: ICreateChooseCard = {
        gameId,
        userCardId: selectedCard?.id,
        isTakeCardFromDeck
      };
      const res = await api.createChooseCard(
        body,
        () => {
          setIsTakeCardFromDeck(false);
          setSelectedCard(null);
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          fetchGameState();
        }
      );
      return res;
    },
    {
      ...defaultQueryProps,
      enabled: !!isTakeCardFromDeck
    }
  );

  return (
    <div className={`${FIXED_SIZE} ${backGround} relative`}>
      {!isItEmpty(users)
        ? <div className='flex justify-evenly'>
          {users.filter((user: ICharacter) => user?.nameOfCharacter !== MARSHAL).map((user: ICharacter) => (
            <CharacterProfile key={user?.id} character={user}/>))}
        </div>
        : null
      }
      {isShowChoseCardButton
        ? <div className='absolute ml-7 bottom-4 flex'>
          <div>
            <Button
              label={
                <div className={'flex items-center'}>
                  <p className='mr-2 font-west text-3xl'>chose card</p>
                </div>}
              onClick={() => {
                void createChooseCard();
              }}
              {...buttonSettings}
            />
          </div>
          <div className='ml-4'>
            <Button
              label={
                <div className={'flex items-center'}>
                  <p className='mr-2 font-west text-3xl'>get more cards</p>
                </div>}
              onClick={() => setIsTakeCardFromDeck(true)}
            />
          </div>
        </div>
        : null
      }
      <RoundCardSymbols/>
      <PlayCards selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
      <Cabins/>
    </div>
  );
};
export default Home;
