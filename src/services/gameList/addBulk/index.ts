import { getToken } from '../../../modules/auth.module';
import GameListAddBulkDTO from '../../../types/gameList/GameListAddBulkDTO';
import gameListBulkReturnDTO from '../../../types/gameList/GameListBulkReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const addBulkGameList = async (data: GameListAddBulkDTO) => {
  const endpoint = '/gamelist/add/bulk';

  const token = await getToken();
  const headers = {
      'Authorization': `Bearer ${token}`
  };  

  try {
    const response = await ApiManager.post(endpoint, data, { headers })
      .then((response) => {
        if (response.data) {
          const content = response.data;
          const gameListReturn: gameListBulkReturnDTO[] = content.map((game: any) => {
            return {
              id: game.id,
              userId: game.userId,
              gameId: game.gameId,
              gameName: game.gameName,
              listId: game.listId
            };
          });

          return gameListReturn;
        }
      })
      .catch((error) => {
        console.error('Error while adding bulk game list:', error.response?.data);
        throw error;
      });

    return response;
  } catch (error: any) {
    console.error('Error while adding bulk game list:', error);
    throw error;
  }
};
