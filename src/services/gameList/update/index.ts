import { ApiManager } from "../../../utils/API-axios/ApiManager";
import GameListUpdateDTO from "../../../types/gameList/GameListUpdateDTO";
import GameListReturnDTO from "../../../types/gameList/GameListReturnDTO";
import { getToken } from "../../../modules/auth.module";

type UpdateGameListProps = {
    gameListId: string;
    data: GameListUpdateDTO;
}

export const updateGameList = async (props: UpdateGameListProps) => {
    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const endpoint = `/gamelist/update/${props.gameListId}`;

    try {
        const response = await ApiManager.put(endpoint, props.data, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error updating game list: ', error);
                throw error;
            });

        if (response.data) {
            const content = response.data;
            const gameListUpdated: GameListReturnDTO = {
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

            return gameListUpdated;
        } else {
            throw new Error('Error mapping game list updated to a dto');
        }
    } catch (error) {
        console.error('Error updating game list:', error);
        throw error;
    }
}