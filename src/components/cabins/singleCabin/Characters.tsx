
import { characterImages } from 'const';
import { ICharacter } from 'const/custom';
import React from 'react';

const Characters: React.FC<ICharacter> = ({ nameOfCharacter }): JSX.Element => {
  const characterBgImage = characterImages[nameOfCharacter];
  return (<div className={`${characterBgImage} w-14 h-28 bg-cover mt-4`}/>);
};
export default Characters;
