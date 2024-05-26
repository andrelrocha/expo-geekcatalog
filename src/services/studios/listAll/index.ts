import { getToken } from '../../../modules/auth.module';
import { StudioDTO } from '../../../types/studios/studioDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const listAllStudios = async () => {
    try {
        const endpoint = "/studios/all";

        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        
        const response = await ApiManager.get(endpoint, {headers})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error listing game studios: ', error);
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const studios: StudioDTO[] = content.map((studio: any) => {
                return {
                    id: studio.id,
                    name: studio.name,
                    countryName: studio.countryName,
                    countryId: studio.countryId,
                };
            });
            return studios;
        } else {
            throw new Error('Error listing game studios: ' + response.status);
        }
    } catch (error) {
        console.error('Error listing studios:', error);
        throw error;
    }
}