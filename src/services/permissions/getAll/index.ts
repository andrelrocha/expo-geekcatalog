import { Alert } from 'react-native';
import { ApiManager } from '../../../utils/API-axios/ApiManager';
import { getToken } from '../../../modules/auth.module';

type PermissionKey = "ADD_GAME" | "DELETE_GAME" | "READ" | "UPDATE_GAME";

export default async function listAllGamePermissions() {
    try {
        const token = await getToken();

        const headers = {
            'Authorization': `Bearer ${token}`
        }

        let endpoint = `/permissions/all`;

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error listing all permissions:', error);
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const desiredPermissions: Record<PermissionKey, string> = {
                "READ": "View games",
                "ADD_GAME": "Add games",
                "DELETE_GAME": "Delete games",
                "UPDATE_GAME": "Update games",
            };
            const permissions = content
                .filter((permission: any) => Object.keys(desiredPermissions).includes(permission.permission))
                .map((permission: { id: string, permission: PermissionKey }) => {
                    return {
                        id: permission.id,
                        permission: desiredPermissions[permission.permission],
                    }
                });
            return permissions;
        }
    } catch (error) {
        console.error('Error listing all permissions:', error);
        Alert.alert('Error listing all permissions:' + (error as Error).message);
    }
}