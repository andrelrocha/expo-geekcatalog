import { getToken } from '../../../modules/auth.module';

import GameStudioCreate from '../../../types/gameStudio/gameStudioCreateDTO';
import GameStudioReturn from '../../../types/gameStudio/gameStudioReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const createGameStudio = async (gameStudioData: GameStudioCreate) => {
  const endpoint = '/gamestudio/create';

  const token = await getToken();
  const headers = {
      'Authorization': `Bearer ${token}`
  };  

  try {
    const response = await ApiManager.post(endpoint, gameStudioData, { headers })
      .then((response) => {
        if (response.data) {

          const gameStudioReturn: GameStudioReturn = {
            id: response.data.id,
            gameName: response.data.gameName,
            studioName: response.data.studioName,
          };

        return gameStudioReturn;
        }
      })
      .catch((error) => {
        throw error;
      });

    return response;
  } catch (error: any) {
    console.error('Error while creating a game studio entity:', error);
    throw error;
  }
};