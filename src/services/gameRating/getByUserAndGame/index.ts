import { ApiManager } from "../../../utils/API-axios/ApiManager";
import GameRatingReturnDTO from "../../../types/gameRating/GameRatingReturn";
import { getToken } from "../../../modules/auth.module";

type HandleGetUserRatingByGameProps = {
    gameId: string;
};

export const getUserRatingByGame = async (props: HandleGetUserRatingByGameProps) => {
    const token = await getToken();
    const headers ={
        'Authorization': `Bearer ${token}`
    }
    const endpoint = `/gamerating/game/${props.gameId}`;

    try {
        const response = await ApiManager.get(endpoint, { headers })

        if (response.data) {
            const data = response.data;

            const userRating: GameRatingReturnDTO = {
                gameId: data.gameId,
                userId: data.userId,
                userName: data.userName,
                rating: data.rating
            };

            return userRating;
        } else { 
            throw new Error('Error mapping user rating by game to dto');
        }
    } catch (error) {
        console.error('Error getting user rating by game:', error);
        throw error;
    }
};