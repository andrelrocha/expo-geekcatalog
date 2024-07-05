import { getToken } from '../../../modules/auth.module';
import GameListAddDTO from '../../../types/gameList/GameListAddDTO';
import GameListReturnDTO from '../../../types/gameList/GameListReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const addGameList = async (data: GameListAddDTO) => {
  const endpoint = '/gamelist/add';

  const token = await getToken();
  const headers = {
      'Authorization': `Bearer ${token}`
  };  

  try {
    const response = await ApiManager.post(endpoint, data, { headers })
      .then((response) => {
        if (response.data) {
          const content = response.data;
          const gameListReturn: GameListReturnDTO = {
            id: content.id,
            userId: content.userId,
            gameId: content.gameId,
            gameName: content.gameName,
            listId: content.listId,
            consoleId: content.consoleId,
            consoleName: content.consoleName,
            note: content.note,
            rating: content.rating
          }

          return gameListReturn;
        }
      })
      .catch((error) => {
        console.error('Error while mapping game list:', error.response?.data);
        throw error;
      });

    return response;
  } catch (error: any) {
    console.error('Error while adding game list:', error);
    throw error;
  }
};
