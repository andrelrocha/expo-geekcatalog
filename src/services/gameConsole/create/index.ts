import { getToken } from '../../../modules/auth.module';
import GameConsoleCreate from '../../../types/gameConsole/gameConsoleCreateDTO';
import GameConsoleReturn from '../../../types/gameConsole/gameConsoleReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const createGameConsole = async (gameConsoleData: GameConsoleCreate) => {
  const endpoint = '/gameconsole/create';

  const token = await getToken();
  const headers = {
      'Authorization': `Bearer ${token}`
  };  

  try {
    const response = await ApiManager.post(endpoint, gameConsoleData, { headers })
      .then((response) => {
        if (response.data) {

          const gameConsoleReturn: GameConsoleReturn = {
            id: response.data.id,
            gameName: response.data.gameName,
            consoleName: response.data.consoleName,
          };

        return gameConsoleReturn;
        }
      })
      .catch((error) => {
        console.log(error.response?.data);
        console.error('Error while creating a game console entity:', error.response?.data);
        throw error;
      });

    return response;
  } catch (error: any) {
    console.log(error);
    console.error('Error while creating a game console entity:', error);
    throw error;
  }
};