import { ApiManager } from '../../../utils/API-axios/ApiManager';
import { getToken } from '../../../modules/auth.module';
import AddGameCommentDTO from '../../../types/gameComment/AddGameCommentDTO';

export const addGameComment = async (data: AddGameCommentDTO) => {
    try {
        const token = await getToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const endpoint = '/gamecomment/add';

        const response = await ApiManager.post(endpoint, data, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}
