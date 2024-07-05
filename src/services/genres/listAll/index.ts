import { getToken } from '../../../modules/auth.module';
import { NameAndIdDTO } from '../../../types/utils/nameAndIdDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const listAllGenres = async () => {
    try {
        const endpoint = "/genres/all";

        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        
        const response = await ApiManager.get(endpoint, {headers})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const genres: NameAndIdDTO[] = content.map((genre: any) => {
                return {
                    id: genre.id,
                    name: genre.name,
                };
            });
            return genres;
        } else {
            throw new Error('Error mapping game genres to dto: ' + response.status);
        }
    } catch (error) {
        console.error('Error listing game genres:', error);
        throw error;
    }
}