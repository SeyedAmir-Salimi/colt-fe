import React from 'react'
import { characterImages, GEM, PURSE, STRONG_BOX } from 'const'
import { ICharacter } from 'const/custom'
import { FaGem } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import { GiShinyPurse } from "react-icons/gi";

interface ICharacterProfile {
  character: ICharacter
  className?: string,
}

interface ITreasureSingle {
  treasure:{
    icon: any
    number?: number,
    type: string,
  }
}


const TressureSingle: React.FC<ITreasureSingle> = ({treasure})=> {
  return(
    <div className='relative'>
      {treasure?.icon}
      <h1 className='absolute top-1 right-1 text-xl'>{treasure?.number}</h1>
    </div>
  )
}
const iconStyle ='text-red mx-2 text-xl'

const CharacterProfile: React.FC<ICharacterProfile> = ({character, className= ''}): JSX.Element => {
  const { ai, nameOfCharacter:name, score, treasures} = character

    const treasureList = [
        {
          type: STRONG_BOX,
          number: treasures.filter((tr)=> tr?.treasuresType === STRONG_BOX)?.length,
          icon: <BsBriefcaseFill className={iconStyle}/>
        },
        {
          type: GEM,
          number: treasures.filter((tr)=> tr?.treasuresType === GEM)?.length,
          icon: <FaGem className={iconStyle}/>
        },
        {
          type: PURSE,
          number: treasures.filter((tr)=> tr?.treasuresType === PURSE)?.length,
          icon:  <GiShinyPurse className={iconStyle}/>
        },
    ]

    return (
      <div className={`h-32 w-32 rounded-full text-center ${className}`}>
        <h1 className={`text-2xl ${!ai ? 'text-orange': 'text-black'}`}>
          {`${name }${!ai ? '(You)': ''}`}
        </h1>
        <div className={`bg-no-repeat rounded-full border border-black h-32 ${characterImages[name]}  bg-slate`}/>
        <div className='flex justify-center mt-2'>
          {treasureList.map((tr) => (
            <TressureSingle key={tr?.type} treasure={tr}/>
          ))}
        </div>
        {!ai && score ? <h1 className='text-lg'>{`$${score}`}</h1> : ''}
      </div>
      )
}
export default CharacterProfile
