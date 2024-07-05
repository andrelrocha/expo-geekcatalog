import { getToken } from '../../../modules/auth.module';

import GameGenreCreate from '../../../types/gameGenre/gameGenreCreateDTO';
import GameGenreReturn from '../../../types/gameGenre/gameGenreReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const createGameGenre = async (gameGenreData: GameGenreCreate) => {
  const endpoint = '/gamegenre/create';

  const token = await getToken();
  const headers = {
      'Authorization': `Bearer ${token}`
  };  

  try {
    const response = await ApiManager.post(endpoint, gameGenreData, { headers })
      .then((response) => {
        if (response.data) {

          const gameGenreReturn: GameGenreReturn = {
            id: response.data.id,
            gameName: response.data.gameName,
            genreName: response.data.genreName,
          };

        return gameGenreReturn;
        }
      })
      .catch((error) => {
        throw error;
      });

    return response;
  } catch (error: any) {
    console.error('Error while creating a game genre entity:', error);
    throw error;
  }
};