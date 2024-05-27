import { Alert } from "react-native";
import { ApiManager } from "../../../utils/API-axios/ApiManager";
import ListReturn from "../../../types/listsApp/ListReturnDTO";
import { getByGameID } from "../../imageGame/getByGameID";

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

        let endpoint = `/list/all/${props.userId}`;

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
            const listsPromises = content.map(async (list: any) => {
                let endpointCount = `/gamelist/count/${list.id}`;
                let endpointLatestGames = `/gamelist/latest/${list.id}`;
                let latestGamesUris: string[] = []; 

                try {
                    const responseCount = await ApiManager.get(endpointCount, { headers })
                        .then((response) => {
                            return response;
                        })
                        .catch((error) => {
                            console.error(`Error counting games lists for list with id ${list.id}:`, error);
                            throw error;
                        });

                    const latestGamesAdded = await ApiManager.get(endpointLatestGames, { headers })
                        .then((response) => {
                            return response;
                        })
                        .catch((error) => {
                            console.error('Error listing latest games added:', error);
                            throw error;
                        });

                    if (latestGamesAdded.data.content.length > 0) {
                        const latestGamesUrisPromises = latestGamesAdded.data.content.map(async (game: any) => {
                            try {
                                const responseImageGame = await getByGameID({ token: props.token, gameId: game.gameId });
                                return responseImageGame.imageUrl;
                            } catch (error) {
                                console.error(`Error fetching image game of game with ID ${game.gameId}:`, error);
                                return null;
                            }
                        });

                        latestGamesUris = await Promise.all(latestGamesUrisPromises);
                    }

                    return {
                        id: list.id,
                        name: list.name,
                        description: list.description,
                        ownerId: list.ownerId,
                        userName: list.userName,
                        count: responseCount.data.gameCount,
                        latestUris: latestGamesUris
                    };
                } catch (error) {
                    console.error('Error listing games lists:', error);
                    throw error;
                }
            });

            const lists: ListReturn[] = await Promise.all(listsPromises);

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
