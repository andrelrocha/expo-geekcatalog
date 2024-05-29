import { Alert } from "react-native";
import { ApiManager } from "../../../utils/API-axios/ApiManager";
import ListFullInfoReturn from "../../../types/listsApp/ListFullInfoReturnDTO";

type HandleListSharedGamesProps = {
    params: string;
    token: string;
    userId: string;
};

export const sharedListsAppByUserID = async (props: HandleListSharedGamesProps) => {
    try {
        const headers = {
            'Authorization': `Bearer ${props.token}`
        }

        let endpoint = `/listfull/permissioned/${props.userId}`;

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
                console.error('Error listing shared info games lists:', error);
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const lists = content.map((list: any) => {
                try {
                    const listReturn: ListFullInfoReturn = {
                        id: list.id,
                        name: list.name,
                        description: list.description,
                        ownerId: list.ownerId,
                        count: list.count ? list.count : 0,
                        latestUris: list.gamesUri ? list.gamesUri : [],
                    };

                    return listReturn;
                } catch (error) {
                    console.error('Error listing shared info games lists:', error);
                    throw error;
                }
            });

            return { lists, pageable: response.data.pageable, totalElements: response.data.totalElements, totalPages: response.data.totalPages };
        } else {
            throw new Error('Error listing shared info games lists: ' + response.status);
        }
    } catch (error) {
        console.error('Error listing shared info games lists:', error);
        Alert.alert('Error listing shared info games lists:' + (error as Error).message);
        throw error;
    }
}
