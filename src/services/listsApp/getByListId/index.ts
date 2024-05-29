import { Alert } from "react-native";
import { ApiManager } from "../../../utils/API-axios/ApiManager";
import ListGameReturn from "../../../types/listsApp/ListsAppReturnDTO";
import { getToken } from "../../../modules/auth.module";

type HandleListUpdateProps = {
    listId: string;
};

export const listAppByListId = async (props: HandleListUpdateProps) => {
    try {
        const token = await getToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const endpoint = `/list/id/${props.listId}`;

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error listing game list info:', error);
                throw error;
            });

        if (response.data) {
            const list = response.data;
            const listReturn: ListGameReturn = {
                id: list.id,
                name: list.name,
                description: list.description,
                visibility: list.visibility,
                ownerId: list.ownerId,
                userName: list.userName,
            };

            return listReturn;
        }
    } catch (error) {
        console.error('Error listing game list info:', error);
        Alert.alert('Error listing games list info:' + (error as Error).message);
        throw error;
    }
}