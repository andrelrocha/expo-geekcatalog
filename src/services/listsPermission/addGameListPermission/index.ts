import { getToken } from "../../../modules/auth.module";
import AddGameListPermission from "../../../types/listsPermission/AddGameListPermissionDTO";
import GameListPermissionReturn from "../../../types/listsPermission/GameListPermissionReturnDTO";
import { ApiManager } from "../../../utils/API-axios/ApiManager";

export async function addGameListPermission(data: AddGameListPermission) {
    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const endpoint = "/listspermission/add";
    try {
        const response = await ApiManager.post(endpoint, data, { headers })
            .then((response) => {
                if (response.data) {
                    const gameListReturn: GameListPermissionReturn = {
                        id: response.data.id,
                        ownerId: response.data.ownerId,
                        listId: response.data.listId,
                        permissionId: response.data.permissionId,
                        participantId: response.data.participantId,
                        participantName: response.data.participantName
                    };

                    return gameListReturn;
                }
            })
            .catch((error) => {
                throw error;
            });

        return response;
    } catch (error: any) {
        console.error('Error adding permission list:', error);
        throw error;
    }
}