import { getToken } from "../../../modules/auth.module";
import GameFullInfoAdminDTO from "../../../types/games/gameFullInfoAdminDTO";
import { ApiManager } from "../../../utils/API-axios/ApiManager";

export const updateGame = async (gameData: GameFullInfoAdminDTO) => {
    const endpoint = `/fullgame/admin/update/${gameData.id}`;

    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`,
    }

    try {
        const response = await ApiManager.put(endpoint, gameData, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error updating full game info:', error);
                throw error;
            });
    
            if (response.data) {
                const data = response.data;
                
                const game: GameFullInfoAdminDTO = {
                    id: data.id,
                    name: data.name,
                    metacritic: data.metacritic,
                    yearOfRelease: data.yearOfRelease,
                    genres: data.genres.map((genre: any) => genre),
                    studios: data.studios.map((studio: any) => studio),
                    consoles: data.consoles.map((console: any) => console),
                };
            
                return game;
            } else {
                throw new Error('Error updating full game info: ' + response);
            }
    } catch (error) {
        console.error('Error updating full game info: ', error);
        throw error;
    }
}