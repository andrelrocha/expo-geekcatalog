import { getToken } from '../../../modules/auth.module';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const deleteListGame = async (listId: string) => {
    const endpoint = `/list/delete/${listId}`;
    
    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    try {
        await ApiManager.delete(endpoint, { headers })
            .then((response) => {
                if (response.status === 204) {
                    return response;
                } else {
                    throw new Error('Error while deleting a list: ' + response.status);
                }
            })
            .catch((error) => {
                console.error('Error while deleting a list:', error.response?.data);
                throw error;
            });

    } catch (error: any) {
        console.error('Error while deleting a list:', error);
        throw error;
    }
}