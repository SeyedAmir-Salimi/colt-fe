import { characterImages } from 'const'
import { ICharacter } from 'const/custom'
import React from 'react'


const Characters: React.FC<ICharacter> = ({nameOfCharacter}): JSX.Element => {
    return (<div className={`${characterImages[nameOfCharacter]} w-14 h-24 bg-cover mt-1`}/>)
}
export default Characters
