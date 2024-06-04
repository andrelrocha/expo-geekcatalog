import { ApiManager } from "../../../utils/API-axios/ApiManager";
import GameListPermissionReturn from "../../../types/listsPermission/GameListPermissionReturnDTO";
import { getToken } from "../../../modules/auth.module";

export const getListPermissionsByUser = async (listId: string) => {
    const token = await getToken();

    const headers = {
        'Authorization': `Bearer ${token}`,
    };

    const endpoint = `/listspermission/all/${listId}`;

    try {
        const response = await ApiManager.get(endpoint, { headers })
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
        console.error('Error getting permissions list:', error);
        throw error;
    }
}