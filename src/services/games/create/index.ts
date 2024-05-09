import { getToken } from '../../../modules/auth.module';
import GameCreate from '../../../types/games/gameCreateDTO';
import GameReturn from '../../../types/games/gameReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const createGame = async (gameData: GameCreate) => {
  const endpoint = '/games/create';

  const token = await getToken();
  const headers = {
      'Authorization': `Bearer ${token}`
  };  

  try {
    const response = await ApiManager.post(endpoint, gameData, { headers })
      .then((response) => {
        if (response.data) {

          const gameReturn: GameReturn = {
            id: response.data.id,
            name: response.data.name,
            metacritic: response.data.metacritic,
            yearOfRelease: response.data.yearOfRelease,
          };

        return gameReturn;
        }
      })
      .catch((error) => {
        console.log(error.response?.data);
        console.error('Error while creating a game:', error.response?.data);
        throw error;
      });

    return response;
  } catch (error: any) {
    console.log(error);
    console.error('Error while creating a game:', error);
    throw error;
  }
};