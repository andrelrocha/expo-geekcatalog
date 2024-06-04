import { getToken } from "../../../modules/auth.module";
import { ApiManager } from "../../../utils/API-axios/ApiManager";

type DeletePermissionsProps = {
    participantEmail: string;
    listId: string;
}

export const deleteAllListPermission = async (props: DeletePermissionsProps) => {
    const token = await getToken();

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const endpoint = `/listspermission/deleteall/list/${props.listId}/login/${props.participantEmail}`;

    try {
        await ApiManager.delete(endpoint, { headers });
    } catch (error) {
        console.error('Error deleting list permission:', error);
        throw error;
    }
};