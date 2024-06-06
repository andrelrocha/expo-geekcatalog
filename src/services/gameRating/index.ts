import { ApiManager } from "../../utils/API-axios/ApiManager";
import AddGameRatingDTO from "../../types/gameRating/AddGameRating";
import GameRatingReturnDTO from "../../types/gameRating/GameRatingReturn";
import { getToken } from "../../modules/auth.module";

export const addGameRating = async (data: AddGameRatingDTO) => {
    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const endpoint = '/gamerating/add';
    try {
        const response = await ApiManager.post(endpoint, data, { headers });
        
        if (response.data) {
            const gameRating: GameRatingReturnDTO = response.data;
            return gameRating;
        } else {
            throw new Error('Error adding game rating');
        }
    } catch (error) {
        console.error('Error adding game rating:', error);
        throw error;
    }
}