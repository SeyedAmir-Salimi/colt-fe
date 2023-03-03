import React, { useState, useEffect } from 'react';
import Button from 'components/button/Button';
import { FaHatCowboy } from 'react-icons/fa';
import { ALL_CHARACTER, ButtonType, FIXED_SIZE } from 'const';
import { IAllCharacter } from 'const/custom';
import CharactersSingle from 'components/wantedCharactersSingle/WantedCharactersSingle';
import { useQuery } from 'react-query';
import api from 'api/api';
import defaultQueryProps from 'api/configs';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const { refetch: createGame, data: gameId } = useQuery(
    ['createGame@Login'],
    async (): Promise<string | undefined> => {
      const { gameId: resultGameId } = await api.createGame(selectedCharacter);
      return resultGameId;
    },
    {
      ...defaultQueryProps,
      enabled: false
    }
  );

  useEffect(() => {
    if (Boolean(gameId)) navigate(`/${gameId ?? ''}`);
  }, [gameId]);

  return (
    <div className={`${FIXED_SIZE} bg-coltExpress bg-cover bg-no-repeat`}>
      <div className='flex h-[34em] justify-evenly'>
        {ALL_CHARACTER.map((cha: IAllCharacter) => (
          <CharactersSingle key={cha?.name} character={cha} onClick={() => setSelectedCharacter(cha?.name)} selectedCharacter={selectedCharacter}/>
        ))}
      </div>
      <div className='text-center mt-10'>
        <Button
          label={
            <div className={'flex items-center'}>
              <p className='mr-2 font-west text-3xl'>Start</p>
              <FaHatCowboy className='text-3xl'/>
            </div>}
          type={(!Boolean(selectedCharacter)) ? ButtonType.secondary : ButtonType.primary}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => await createGame()}
          disabled={!!Boolean(selectedCharacter)}
          className={`${(!Boolean(selectedCharacter)) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        />
      </div>
    </div>
  );
};
export default Login;
