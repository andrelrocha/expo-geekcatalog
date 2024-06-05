import { getToken } from "../../../modules/auth.module";
import { ApiManager } from "../../../utils/API-axios/ApiManager";
import GameListReturnDTO from "../../../types/gameList/GameListReturnDTO";

export const getGameListById = async (id: string) => {
    const token = await getToken();

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const endpoint = `/gamelist/byid/${id}`;

    try {
        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                if (response.data) {
                    const gameList: GameListReturnDTO = {
                        id: response.data.id,
                        userId: response.data.userId,
                        gameId: response.data.gameId,
                        gameName: response.data.gameName,
                        listId: response.data.listId,
                        consoleId: response.data.consoleId,
                        consoleName: response.data.consoleName,
                        note: response.data.note,
                    };

                    return gameList;
                } else {
                    throw new Error('Error mapping game list by id to a dto');
                }
            })
            .catch((error) => {
                console.error('Error fetching game list by id:', error);
                throw error;
            });

        return response;
    } catch (error) {
        console.error('Error fetching game list by id:', error);
        throw error;
    }
}