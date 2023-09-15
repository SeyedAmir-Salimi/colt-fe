import React, { useContext } from 'react';
import { characterImages, GAME_STATE, GEM, GHOST, PURSE, STRONG_BOX } from 'const';
import { ICharacter, IGameState } from 'const/custom';
import { Context } from 'context/context';
import ChosenCard from './ChosenCard';
import { isInTunnel, isStillChoosingCard } from 'utils/cardUtils';
import ActionCards from './ActionCards';

interface ICharacterProfile {
  character: ICharacter
  className?: string
}

interface ITreasureSingle {
  treasure: {
    icon: string
    number?: number
    type: string
  }
}

const TressureSingle: React.FC<ITreasureSingle> = ({ treasure }) => {
  return (
    <div className='relative'>
      <div className={`bg-cover ${treasure?.icon}`}/>
      <h1 className='absolute -bottom-4 right-1 text-xl text-viola'>{treasure?.number}</h1>
    </div>
  );
};

const CharacterProfile: React.FC<ICharacterProfile> = ({ character, className = '' }): JSX.Element => {
  const { gameState } = useContext<{ [GAME_STATE]: IGameState }>(Context);
  const { usersLastChosenCards, roundCard, users, minSet, set } = gameState ?? {};
  const { ai, nameOfCharacter: name, score, treasures } = character;
  const treasureList = [
    {
      type: STRONG_BOX,
      number: treasures.filter((tr) => tr?.treasuresType === STRONG_BOX)?.length,
      icon: 'bg-briefCase w-12 h-10'
    },
    {
      type: GEM,
      number: treasures.filter((tr) => tr?.treasuresType === GEM)?.length,
      icon: 'bg-gem w-10 h-10'
    },
    {
      type: PURSE,
      number: treasures.filter((tr) => tr?.treasuresType === PURSE)?.length,
      icon: 'bg-monyBag w-8 h-10'
    }
  ];

  const characterLastChosenCard = usersLastChosenCards.find(card => card?.owner === name);
  const isFirstSetAiGhost = ai && characterLastChosenCard?.set === 1 && name === GHOST;
  const isNotAiLastChosenCardInTunnel = isInTunnel(roundCard, characterLastChosenCard?.set) && ai;

  const userAllChosenCards = users?.find(user => user?.nameOfCharacter === name)?.chosenCards;
  const characterMinSetChosenCard = userAllChosenCards?.find(card => card?.set === minSet);
  const isChoseCardButton = isStillChoosingCard(roundCard, set);

  return (
    <div className={`h-32 w-32 text-center ${className} mt-5 relative`}>
      <h1 className={`text-2xl font-west ${!ai ? 'text-red' : 'text-viola'}`}>
        {`${name}`}
      </h1>

      {Boolean(characterLastChosenCard) && isChoseCardButton && !isNotAiLastChosenCardInTunnel && !isFirstSetAiGhost
        ? <div className='absolute -left-24'>
          <ChosenCard
            card={characterLastChosenCard ?? null}
          />
        </div>
        : null
      }
      {(!isChoseCardButton && characterMinSetChosenCard != null)
        ? <div className='absolute -left-24'>
          <ChosenCard
            card={characterMinSetChosenCard ?? null}
          />
        </div>
        : null}

      <div className='absolute left-28'>
        <ActionCards character={character}/>
      </div>

      <div className={`bg-no-repeat rounded-full border border-black h-32 ${characterImages[name] ?? ''}  bg-slate`}/>
      <div className='flex justify-center'>
        {treasureList.map((tr) => (
          <TressureSingle key={tr?.type} treasure={tr}/>
        ))}
      </div>
      {!ai && (score !== 0) ? <h1 className='text-lg mt-3 font-bold text-viola'>{`$${score}`}</h1> : ''}
    </div>
  );
};
export default CharacterProfile;
