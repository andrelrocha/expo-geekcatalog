import { getToken } from '../../../modules/auth.module';
import { NameAndIdDTO } from '../../../types/utils/nameAndIdDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const listAllConsolesByGameId = async (gameId: string) => {
    try {
        const endpoint = `/consoles/game/${gameId}`;

        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        
        const response = await ApiManager.get(endpoint, {headers})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error listing consoles by game id: ', error);
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const consoles: NameAndIdDTO[] = content.map((console: any) => {
                return {
                    id: console.id,
                    name: console.name,
                };
            });
            return consoles;
        } else {
            throw new Error('Error listing consoles by game id: ' + response.status);
        }
    } catch (error) {
        console.error('Error listing consoles by game id:', error);
        throw error;
    }
}