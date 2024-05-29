import { getToken } from '../../../modules/auth.module';
import ListCreateDTO from '../../../types/listsApp/ListAppDTO';
import ListGameReturn from '../../../types/listsApp/ListsAppReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const createListGame = async (listData: ListCreateDTO) => {
    const endpoint = '/list/create';
    
    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await ApiManager.post(endpoint, listData, { headers })
            .then((response) => {
                if (response.data) {
                    const listReturn: ListGameReturn = {
                        id: response.data.id,
                        name: response.data.name,
                        description: response.data.description,
                        visibility: response.data.visibility,
                        ownerId: response.data.ownerId,
                        userName: response.data.userName
                    };

                    return listReturn;
                }
            })
            .catch((error) => {
                console.error('Error while creating a list:', error.response?.data);
                throw error;
            });

        return response;
    } catch (error: any) {
        console.error('Error while creating a list:', error);
        throw error;
    }
}
