import { getToken } from "../../../modules/auth.module";
import AddGameListPermission from "../../../types/listsPermission/AddGameListPermissionDTO";
import GameListPermissionReturn from "../../../types/listsPermission/GameListPermissionReturnDTO";
import { ApiManager } from "../../../utils/API-axios/ApiManager";

export async function addBulkGameListPermission(data: AddGameListPermission) {
    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const endpoint = "/listspermission/add/bulk";
    try {
        const response = await ApiManager.post(endpoint, data, { headers })
            .then((response) => {  
                if (response.data) {
                    const permissionsList: GameListPermissionReturn[] = response.data.map((permission: any) => {
                        return {
                            id: permission.id,
                            listId: permission.listId,
                            permissionId: permission.permissionId,
                            permissionName: permission.permissionName,
                            participantId: permission.participantId,
                            participantName: permission.participantName,
                            ownerId: permission.ownerId
                        };
                    });

                    return permissionsList;
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