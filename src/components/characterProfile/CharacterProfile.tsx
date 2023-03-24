import React from 'react';
import { characterImages, GEM, PURSE, STRONG_BOX } from 'const';
import { ICharacter } from 'const/custom';
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
      <h1 className='absolute -bottom-4 right-1 text-xl'>{treasure?.number}</h1>
    </div>
  );
};

const CharacterProfile: React.FC<ICharacterProfile> = ({ character, className = '' }): JSX.Element => {
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

  return (
    <div className={`h-32 w-32 rounded-full text-center ${className} mt-5`}>
      <h1 className={`text-2xl font-west ${!ai ? 'text-red' : 'text-viola'}`}>
        {`${name}`}
      </h1>
      <div className={`bg-no-repeat rounded-full border border-black h-32 ${characterImages[name] ?? ''}  bg-slate`}/>
      <div className='flex justify-center'>
        {treasureList.map((tr) => (
          <TressureSingle key={tr?.type} treasure={tr}/>
        ))}
      </div>
      {!ai && (score !== 0) ? <h1 className='text-lg mt-3 font-bold'>{`$${score}`}</h1> : ''}
    </div>
  );
};
export default CharacterProfile;
