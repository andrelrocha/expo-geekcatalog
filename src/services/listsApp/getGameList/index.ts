import { Alert } from 'react-native';
import { ApiManager } from '../../../utils/API-axios/ApiManager';
import GameListDTO from '../../../types/gameList/GameListDTO';

type HandleGetAllGameListByListIDProps = {
    params: string;
    token: string;
    listId: string;
};

export const getAllGameListByListID = async (props: HandleGetAllGameListByListIDProps) => {
    try {
        const headers = {
            'Authorization': `Bearer ${props.token}`
        }

        let endpoint = `/gamelist/all/${props.listId}`;

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
                console.error('Errorlisting games in a list:', error);
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const gameLists: GameListDTO[] = content.map((gameList: any) => {
                return {
                    id: gameList.id,
                    gameId: gameList.gameId,
                    gameName: gameList.gameName,
                    consoleId: gameList.consoleId,
                    consolePlayed: gameList.consolePlayed,
                    uri: gameList.uri,
                };
            });

            return {gameLists, pageable: response.data.pageable, totalElements: response.data.totalElements, totalPages: response.data.totalPages};
        } else {
            throw new Error('Error listing games in a list: ' + response);
        }
    } catch (error) {
        console.error('Error listing games in a list:', error);
        Alert.alert('Error listing games in a list:' + (error as Error).message);
        throw error;
    }
}