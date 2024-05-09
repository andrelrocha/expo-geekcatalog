import { getToken } from '../../../modules/auth.module';
import { NameAndIdDTO } from '../../../types/utils/nameAndIdDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const listAllConsoles = async () => {
    try {
        const endpoint = "/consoles/getall";

        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        
        const response = await ApiManager.get(endpoint, {headers})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Erro ao listar os consoles:', error);
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
            throw new Error('Error listing consoles: ' + response.status);
        }
    } catch (error) {
        console.error('Error listing consoles:', error);
        throw error;
    }
}