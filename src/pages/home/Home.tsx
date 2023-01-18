import api from 'api/api';
import defaultQueryProps from 'api/configs';
import CharacterProfile from 'components/characterProfile/CharacterProfile';
import { ICharacter, Keyable } from 'const/custom';
import React from 'react'
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import { isItEmpty } from 'utils/utils';

const Home: React.FC = (): JSX.Element => {
  // const gameId = '39khory1wcilbwgbnnp'
  const {id:gameId} = useParams();

  const { data: gameState } = useQuery(
    [`getGameState@HomePage`, gameId],
    async (): Promise<Keyable> => {
      const response = await api.getGameState(gameId)
      return response
    },
    {
      ...defaultQueryProps,
      enabled: !!gameId,
    }
  );

  return (
    <div>
      {gameState && !isItEmpty(gameState?.users) ?
        <div className='flex justify-around'>
          {gameState?.users.map((user: ICharacter)=> (
            <CharacterProfile key={user?.id} character={user}/>))}
        </div> 
        : null
      }
    </div>
    )
}
export default Home
