import { ApiManager } from "../../../utils/API-axios/ApiManager";
import { Alert } from "react-native";
import ListCountReturn from "../../../types/listsApp/ListCountReturnDTO";

type HandleListAllGamesProps = {
    params: string;
    token: string;
    userId: string;
};

export const listAllPublicListsByUserID = async (props: HandleListAllGamesProps) => {
    try {
        const headers = {
            'Authorization': `Bearer ${props.token}`
        }

        let endpoint = `/list/public/${props.userId}`;

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
                console.error('Error listing public games lists:', error);
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const listsPromises = content.map(async (list: any) => {
                let endpointCount = `/gamelist/count/${list.id}`;

                try {
                    const responseCount = await ApiManager.get(endpointCount, { headers });

                    return {
                        id: list.id,
                        name: list.name,
                        description: list.description,
                        ownerId: list.ownerId,
                        userName: list.userName,
                        count: responseCount.data.gameCount
                    };
                } catch (error) {
                    console.error(`Error counting games lists for list with id ${list.id}:`, error);
                    throw error;
                }
            });

            const lists: ListCountReturn[] = await Promise.all(listsPromises);

            return { lists, pageable: response.data.pageable, totalElements: response.data.totalElements, totalPages: response.data.totalPages };
        } else {
            throw new Error('Error listing public games lists: ' + response.status);
        }
    } catch (error) {
        console.error('Error listing public games lists:', error);
        Alert.alert('Error listing public games lists:' + (error as Error).message);
        throw error;
    }
}