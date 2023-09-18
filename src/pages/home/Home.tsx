import api from 'api/api';
import defaultQueryProps from 'api/configs';
import Button from 'components/button/Button';
import Cabins from 'pages/home/cabins/Cabins';
import CharacterProfile from 'pages/home/characterProfile/CharacterProfile';
import PlayCards from 'pages/home/playCards/PlayCards';
import RoundCardSymbols from 'pages/home/roundCardSymbols/RoundCardSymbols';
import { ButtonType, FIXED_SIZE, GAME_STATE, MARSHAL, NOTHING, SELECTED_PASSIVE } from 'const';
import { ICardStates, ICharacter, ICreateChooseCard, ICreatePlayCard, IGameState, Keyable } from 'const/custom';
import { Context } from 'context/context';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getDifferentElements, isArrayLength, isItEmpty } from 'utils';
import { isInTunnel, isStillChoosingCard } from 'utils/cardUtils';
import Loader from 'components/loader/Loader';

const Home: React.FC = (): JSX.Element => {
  const {
    addValueToState,
    selectedPassive,
    addMoreValueToState,
    gameState
  } = useContext<{
    addValueToState: Keyable
    addMoreValueToState: Keyable
    [SELECTED_PASSIVE]: string | null
    [GAME_STATE]: IGameState
  }>(Context);
  const { id: gameId } = useParams();
  const [selectedCard, setSelectedCard] = useState<ICardStates | null>(null);
  const [isTakeCardFromDeck, setIsTakeCardFromDeck] = useState<boolean>(false);

  const { isFetching: isFetchGetGameState } = useQuery(
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
  const { users, roundCard, set, userPassives } = gameState ?? {};

  const isShowChoseCardButton = isStillChoosingCard(roundCard, set);

  const backGround = isInTunnel(roundCard, set) && isShowChoseCardButton
    ? 'bg-TrainWestTunnel'
    : 'bg-TrainWest';

  const buttonSettings = {
    type: !Boolean(selectedCard) ? ButtonType.secondary : ButtonType.primary,
    disabled: !Boolean(selectedCard)
  };

  const { refetch: createChooseCard, isFetching: isFetchCreateChooseCard } = useQuery(
    ['createChooseCard@HomePage', isTakeCardFromDeck],
    async (): Promise<Keyable> => {
      const body: ICreateChooseCard = {
        gameId,
        userCardId: selectedCard?.id,
        isTakeCardFromDeck
      };
      const res = await api.createChooseCard(
        body,
        (data: IGameState) => {
          setIsTakeCardFromDeck(false);
          setSelectedCard(null);
          addMoreValueToState({
            [SELECTED_PASSIVE]: null,
            [GAME_STATE]: data
          });
        }
      );

      return res;
    },
    {
      ...defaultQueryProps,
      enabled: !!isTakeCardFromDeck
    }
  );
  const arrays = (oldGameState: IGameState, newGameState: IGameState): any => {
    const oldGame = oldGameState;
    const newArrays: IGameState[] = [];
    const { round, minSet, userPassives, actionState, users, usersLastChosenCards } = newGameState ?? {};
    if (isArrayLength(users)) {
      users.forEach((user, i) => {
        const { nameOfCharacter, treasures: newTreasures, id } = user ?? {};
        const oldUser = oldGameState?.users.find(ur => ur?.id === id);
        const { treasures: oldTreasures } = oldUser ?? {};

        const findOtherUser = users.filter(ou => ou?.id !== user?.id);
        const findUserLastChosenCard = usersLastChosenCards.filter(x => x?.owner === nameOfCharacter);
        const actions = actionState.filter(act => act?.active === nameOfCharacter && act?.round === round && act?.set === minSet);

        const differenceJewelry = getDifferentElements([newTreasures ?? [], oldTreasures ?? []]);

        newArrays.push({
          ...oldGame,
          minSet,
          round,
          set,
          users: [...findOtherUser, user],
          userPassives,
          usersLastChosenCards: [...oldGame?.usersLastChosenCards, ...findUserLastChosenCard],
          actionState: [...oldGame?.actionState, ...actions],
          cars: []
        });
      });
    }
  };

  const { refetch: createChooseActionOptionCard, isFetching: isFetchCreateChooseActionOptionCard } = useQuery(
    ['createChooseActionOptionCard@ChosenOptions'],
    async (): Promise<Keyable> => {
      const body: ICreatePlayCard = {
        gameId: gameId ?? undefined,
        passiveId: selectedPassive ?? NOTHING
      };
      const res = await api.createChooseActionOptionCard(
        body,
        (data: IGameState) => {
          addMoreValueToState({
            [SELECTED_PASSIVE]: null,
            [GAME_STATE]: data
          });
          // addValueToState(SELECTED_PASSIVE, null);
          // fetchGameState();
        }
      );
      // addValueToState(GAME_STATE, res);
      return res;
    },
    {
      ...defaultQueryProps,
      enabled: false
    }
  );

  const isNoPassiveToSelect = userPassives?.some((pass: { id: string }): boolean => pass?.id === NOTHING);

  return (
    <div className={`${FIXED_SIZE} ${backGround} relative`}>

      <Loader isSpinning={(
        isFetchGetGameState ||
        isFetchCreateChooseCard ||
        isFetchCreateChooseActionOptionCard
      )}/>

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
                <div className='flex items-center'>
                  <p className='mr-2 font-west text-3xl'>Chose card</p>
                </div>}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={createChooseCard}
              {...buttonSettings}
            />
          </div>
          <div className='ml-4'>
            <Button
              label={
                <div className={'flex items-center'}>
                  <p className='mr-2 font-west text-3xl'>Get more cards</p>
                </div>}
              onClick={() => setIsTakeCardFromDeck(true)}
            />
          </div>
        </div>
        : <div className='absolute ml-7 bottom-4 flex'>
          <Button
            label={!Boolean(isNoPassiveToSelect) ? 'Please chose your action' : 'There is nothing to chose'}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={createChooseActionOptionCard}
            type={(!Boolean(selectedPassive) && !Boolean(isNoPassiveToSelect)) ? ButtonType.secondary : ButtonType.primary}
            disabled={(!Boolean(selectedPassive) && !Boolean(isNoPassiveToSelect))}
          />
        </div>
      }

      <RoundCardSymbols/>

      {isShowChoseCardButton
        ? <PlayCards selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
        : null
      }

      <Cabins/>
    </div>
  );
};
export default Home;
