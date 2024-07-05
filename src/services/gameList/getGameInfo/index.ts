import { ApiManager } from "../../../utils/API-axios/ApiManager";
import GameListGameInfoDTO from "../../../types/gameList/GameListGameInfo";
import { getToken } from "../../../modules/auth.module";

export const getGameInfoByGameListID = async (gameListId: string) => {
    const token = await getToken();

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const endpoint = `/gamelist/gameinfo/${gameListId}`;

    try {
        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error getting game info by game list id: ', error);
                throw error;
            });

        if (response.data) {
            const content = response.data
            const gameInfo: GameListGameInfoDTO = {
                gameId: content.gameId,
                consolesAvailable: content.consolesAvailable.map((console: any) => {
                    return {
                        id: console.id,
                        name: console.name,
                    };
                }),
            };
            return gameInfo;
        } else {
            throw new Error('Error mapping game info by game list id');
        }
    } catch (error) {
        console.error('Error getting game info by game list id:', error);
        throw error;
    }
}