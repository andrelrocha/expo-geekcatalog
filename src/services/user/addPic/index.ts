import { getToken } from '../../../modules/auth.module';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const addPic = async (id: string, pic: string) => {
    const endpoint = `/profilepic/create/${id}`;

    const token = await getToken();

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,	
    };

    try {
        const response = await ApiManager.post(endpoint, pic, { headers })
        .then((response) => {
            if (response.data) {
            return response.data;
            }
        })
        .catch((error) => {
            console.log(error.response?.data);
            console.error('Erro ao adicionar foto ao usuário:', error);
            throw error;
        });

        return response;
    } catch (error: any) {
        console.log(error);
        console.error('Erro ao adicionar foto ao usuário:', error.response?.data);
        throw error;
    }
};