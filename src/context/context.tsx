import {
  ACTION_STATE,
  CARS,
  GAME_ID,
  GAME_STATE,
  SELECTED_PASSIVE,
  PORT,
  ROUND,
  ROUND_CARD,
  SET,
  USERS,
  USERS_LAST_CHOSEN_CARDS,
  USER_PASSIVES
} from 'const';

import { IGameState } from 'const/custom';
import React, { useState } from 'react';
import { deepCopy } from 'utils';
export const Context: any = React.createContext(null);

interface props {
    children: JSX.Element | JSX.Element[]
}
const ContextProvider = ({ children }: props): React.ReactElement => {
  const [contextValues, setContextValues] = useState<{
      [PORT]: string | undefined
      [GAME_STATE]: IGameState
      [SELECTED_PASSIVE]: string | null
    }>({
      [PORT]: process.env.REACT_APP_GAME_VERSION,
      [GAME_STATE]: {
        [ACTION_STATE]: [],
        [CARS]: null,
        [ROUND]: null,
        [SET]: null,
        [GAME_ID]: null,
        [ROUND_CARD]: null,
        [USER_PASSIVES]: [],
        [USERS]: [],
        [USERS_LAST_CHOSEN_CARDS]: []
      },
      [SELECTED_PASSIVE]: null
    });

  const addValueToState = (key: string, value: any): void => {
    const copeState = deepCopy(contextValues);
    copeState[key] = value;
    setContextValues(copeState);
  };

  const addMoreValueToState = (body: any): void => {
    const copeState = deepCopy(contextValues);
    setContextValues({
      ...copeState,
      ...body
    });
  };

  const value = {
    ...contextValues,
    addValueToState,
    addMoreValueToState
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
