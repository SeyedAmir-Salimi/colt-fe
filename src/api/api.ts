import axios from "axios";
import { notifyError } from "components/toast/Toast";
import { Keyable } from "const/custom";

const apiEndPoint: string | undefined = process.env.REACT_APP_API_ENDPOINT;

export const createGame = async (userCharacter: string | null): Promise<Keyable> => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint}/game/start`,
      {
        userCharacter
      }
    );
    return data;
  } catch (err: Keyable) {

    notifyError(err?.response?.data);
  }
}

export const getGameState = async (gameId: string | undefined): Promise<Keyable> => {
  try {
    const { data } = await axios.get(
      `${apiEndPoint}/game/game-state/${gameId}`);
    // console.log('string', JSON.stringify(data, null, 4));
    return data;
  } catch (err: Keyable) {

    notifyError(err?.response?.data);
  }
};


const exportedObject = {
  createGame,
  getGameState,
};

export default exportedObject;
