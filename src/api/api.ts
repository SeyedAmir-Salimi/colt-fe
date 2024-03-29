import axios from 'axios';
import { notifyError } from 'components/toast/Toast';
import { ICreateChooseCard, Keyable } from 'const/custom';

const apiEndPoint: string | undefined = process.env.REACT_APP_API_ENDPOINT;

export const createGame = async (userCharacter: string | null): Promise<Keyable> => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint ?? '-'}/game/start`,
      {
        userCharacter
      }
    );
    return data;
  } catch (err: Keyable) {
    notifyError(err?.response?.data);
  }
};

export const getGameState = async (gameId: string | undefined): Promise<Keyable> => {
  try {
    const { data } = await axios.get(
      `${apiEndPoint ?? '-'}/game/game-state/${gameId ?? '-'}`
    );
    return data;
  } catch (err: Keyable) {
    notifyError(err?.response?.data);
  }
};

export const createChooseCard = async (body: ICreateChooseCard, onSuccessCallBack: any): Promise<Keyable> => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint ?? '-'}/action/chooseCards`,
      body
    );
    if (Boolean(onSuccessCallBack)) onSuccessCallBack(data);
    return data;
  } catch (err: Keyable) {
    notifyError(err?.response?.data);
  }
};

export const createChooseActionOptionCard = async (body: ICreateChooseCard, onSuccessCallBack: any): Promise<Keyable> => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint ?? '-'}/action/playCards`,
      body
    );
    if (Boolean(onSuccessCallBack)) onSuccessCallBack(data);
    return data;
  } catch (err: Keyable) {
    notifyError(err?.response?.data);
  }
};

const exportedObject = {
  createChooseActionOptionCard,
  createChooseCard,
  createGame,
  getGameState
};

export default exportedObject;
