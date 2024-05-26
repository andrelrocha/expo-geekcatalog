import { ApiManager } from "../../../utils/API-axios/ApiManager";
import ListGameReturn from "../../../types/listsApp/ListsAppReturnDTO";
import { Alert } from "react-native";

type HandleListAllGamesProps = {
    params: string;
    token: string;
    userId: string;
};

export const listAllListsAppByUserID = async (props: HandleListAllGamesProps) => {
    try {
        const headers = {
            'Authorization': `Bearer ${props.token}`
        }

        let endpoint = `/list/getall/${props.userId}`;

        if (props.params === '' || props.params === undefined) {
            endpoint += '/';
        } else {
            endpoint += "?" + props.params;
        }

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error listing games lists:', error);
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const lists: ListGameReturn[] = content.map((list: any) => {
                return {
                    id: list.id,
                    name: list.name,
                    description: list.description,
                    ownerId: list.ownerId,
                    userName: list.userName,
                };
            });

            return { lists, pageable: response.data.pageable, totalElements: response.data.totalElements, totalPages: response.data.totalPages };
        } else {
            throw new Error('Error listing games lists: ' + response.status);
        }
    } catch (error) {
        console.error('Error listing games lists:', error);
        Alert.alert('Error listing games lists:' + (error as Error).message);
        throw error;
    }
}