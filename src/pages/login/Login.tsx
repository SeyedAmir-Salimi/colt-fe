import React, {useState} from 'react'
import Button from 'components/button/Button'
import { FaHatCowboy } from "react-icons/fa";
import { ALL_CHARACTER, ButtonType } from 'const'
import { IAllCharacter, Keyable } from 'const/custom';
import CharactersSingle from 'components/charactersSingle/CharactersSingle';
import { useQuery } from "react-query";
import api from 'api/api'
import defaultQueryProps from 'api/configs';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)

  const { refetch: createGame } = useQuery(
    [`createGame@Login`],
    async (): Promise<Keyable> => {
      const {gameId} = await api.createGame(selectedCharacter)
      if(gameId) navigate(`/${gameId}`)
      return gameId
    },
    {
      ...defaultQueryProps,
      enabled: false,
    }
  );


    return (
      <div className='h-screen w-screen bg-back-w bg-cover bg-no-repeat'>
          <div className='flex h-[34em]'>
            {ALL_CHARACTER.map((cha: IAllCharacter)=> (
              <CharactersSingle key={cha?.name} character={cha} onClick={()=> setSelectedCharacter(cha?.name)} selectedCharacter={selectedCharacter}/>
              ))}
          </div>
          <div className='text-center mt-10'>
            <Button
              label={
                <div className={`flex items-center`}>
                  <p className='mr-2'>Start</p>
                  <FaHatCowboy/>
                </div>}
                type={!selectedCharacter ? ButtonType.secondary : ButtonType.primary}
                onClick={()=> createGame()}
                disabled={!selectedCharacter ? !!ButtonType.secondary : !!ButtonType.primary}
                className={`${!selectedCharacter ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            />
          </div>
      </div>
      )
}
export default Login
