import { characterWantedImages } from 'const'
import React from 'react'

interface ICharactersSingle {
  character:{
    name: string,
    shortDesc: string,
    longDesc: string,
  }
  className?: string,
  onClick: ()=> void,
  selectedCharacter: string | null
}


const WantedCharactersSingle: React.FC<ICharactersSingle> = ({character, className= '', onClick, selectedCharacter}): JSX.Element => {
  const isCharacterSelected = selectedCharacter === character?.name

    return (
      <div onClick={onClick}
        className={`
          ${className} 
          bg-black
          h-fit
          text-center
          ${isCharacterSelected ? 'mt-12' : 'mt-20'}
          group
          cursor-pointer
          border 
          transition
          ease-in-out
          duration-1000
          `}>
        <div className='group-hover:hidden rounded-xl'>
          <div className={`bg-cover w-[211px] h-[360px]  ${characterWantedImages[character.name]} `}/>
        </div>
        <div className='group-hover:flex hidden w-[211px] h-[360px]'>
          <h1 className='text-left p-2 text-midGrey'>{character?.shortDesc}</h1>
        </div>
        <div>
          <h1 className='bg-black font-west text-3xl text-midGrey'>{character?.name}</h1>
        </div>
      </div>
    )
}
export default WantedCharactersSingle
