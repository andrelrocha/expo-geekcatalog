import { getToken } from '../../../modules/auth.module';
import { NameAndIdDTO } from '../../../types/utils/nameAndIdDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const listAllGamesMultiSelect = async () => {
    try {
        const endpoint = "/games/all";

        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const params = {
            size: 100
        };

        const response = await ApiManager.get(endpoint, {headers, params})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const games: NameAndIdDTO[] = content.map((game: any) => {
                return {
                    id: game.id,
                    name: game.name,
                };
            });
            return games;
        } else {
            throw new Error('Error mapping games for multi select to DTO');
        }
    } catch (error) {
        console.error('Error listing games for multi select:', error);
        throw error;
    }
}