import { ApiManager } from "../../../utils/API-axios/ApiManager";
import ListAppDTO from "../../../types/listsApp/ListAppDTO";
import ListGameReturn from "../../../types/listsApp/ListsAppReturnDTO";
import { getToken } from "../../../modules/auth.module";

export async function updateList(listData: ListAppDTO, listId: string) {
    try {
        const endpoint = `/list/update/${listId}`;

        const token = await getToken();

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const response = await ApiManager.put(endpoint, listData, { headers })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('Error updating list:', error.response.data);
                throw new Error('Error updating list: ' + error.response.data);
            });

        const listReturn: ListGameReturn = {
            id: response.id,
            name: response.name,
            description: response.description,
            visibility: response.visibility,
            ownerId: response.ownerId,
            userName: response.userName,
        };

        return listReturn;
    } catch (error) {
        console.error("Caught error:", error);
        throw new Error('Error updating list: ' + error);
    }
}