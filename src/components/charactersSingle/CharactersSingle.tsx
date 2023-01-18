import { characterImages } from 'const'
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


const CharactersSingle: React.FC<ICharactersSingle> = ({character, className= '', onClick, selectedCharacter}): JSX.Element => {
  const isCharacterSelected = selectedCharacter === character?.name

    return (
      <div className={`w-full ${className} text-center p-5`}>
        <div className={`bg-slate rounded-xl min-h-[30em] ${isCharacterSelected ? 'mt-8': ''} cursor-pointer`} onClick={onClick}>
          <div className={`bg-no-repeat h-64 ${characterImages[character.name]} `}/>
          <h1 className='bg-orange'>{character?.name}</h1>
          <h1 className='text-left p-2 text-orange'>{character?.shortDesc}</h1>
        </div>
      </div>
    )
}
export default CharactersSingle
