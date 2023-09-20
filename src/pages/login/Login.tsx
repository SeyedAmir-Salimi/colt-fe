import React, { useState } from 'react';
import Button from 'components/button/Button';
import { FaHatCowboy } from 'react-icons/fa';
import { ALL_CHARACTER, ButtonType, FIXED_SIZE } from 'const';
import { IAllCharacter, IGameState } from 'const/custom';
import WantedCharactersSingle from 'pages/login/wantedCharactersSingle/WantedCharactersSingle';
import { useQuery } from 'react-query';
import api from 'api/api';
import defaultQueryProps from 'api/configs';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/loader/Loader';

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [isCreateGame, setIsCreateGame] = useState<boolean>(false);

  const { isFetching: isLoadingCreateGame } = useQuery(
    ['createGame@Login'],
    async (): Promise<string | undefined> => {
      const { gameId: resultGameId } = await api.createGame(selectedCharacter,
        (data: IGameState) => {
          navigate(`/${data?.gameId ?? ''}`);
          setIsCreateGame(false);
        });
      return resultGameId;
    },
    {
      ...defaultQueryProps,
      enabled: !!isCreateGame
    }
  );

  return (
    <>
      <Loader isSpinning={(
        isLoadingCreateGame
      )}/>

      <div className={`${FIXED_SIZE} bg-coltExpress bg-cover bg-no-repeat`}>
        <div className='flex h-[34em] justify-evenly'>
          {ALL_CHARACTER.map((cha: IAllCharacter) => (
            <WantedCharactersSingle key={cha?.name} character={cha} onClick={() => setSelectedCharacter(cha?.name)} selectedCharacter={selectedCharacter}/>
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

            onClick={() => setIsCreateGame(true)}
            disabled={!Boolean(selectedCharacter)}
            className={`${(!Boolean(selectedCharacter)) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          />
        </div>
      </div>
    </>
  );
};
export default Login;
