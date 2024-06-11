import { getToken } from "../../../modules/auth.module";
import { ApiManager } from "../../../utils/API-axios/ApiManager";

type DeleteGameProps = {
    gameId: string;
}

export const deleteGame = async (props: DeleteGameProps) => {
    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const endpoint = `/games/delete/${props.gameId}`;

    try {
        await ApiManager.delete(endpoint, { headers })
            .catch((error) => {
                throw error;
            });
    } catch (error: any) {
        console.error('Error while deleting a game:', error.response?.data);
        throw error;
    }
}