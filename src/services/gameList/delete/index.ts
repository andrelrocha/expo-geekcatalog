import { getToken } from "../../../modules/auth.module";
import { ApiManager } from "../../../utils/API-axios/ApiManager";

export const deleteGameList = async (id: string) => {
    const token = await getToken();

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const endpoint = `/gamelist/delete/${id}`;

    try {
        await ApiManager.delete(endpoint, { headers });
    } catch (error) {
        console.error('Error deleting game list:', error);
        throw error;
    }
};