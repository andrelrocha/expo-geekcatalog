import { Alert } from 'react-native';
import { ApiManager } from '../../../utils/API-axios/ApiManager';
import ImageGame from '../../../types/imageGame/imageGameDTO';

type HandleListAllImageGamesProps = {
    params: string;
    token: string;
};

export const listAllImageGames = async (props: HandleListAllImageGamesProps) => {
    try {
        const headers = {
            'Authorization': `Bearer ${props.token}`
        }

        let endpoint = "/imagegame/getall";

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
                console.error('Error listing image games:', error);
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const imageGames: ImageGame[] = content.map((imageGame: any) => {
                return {
                    gameId: imageGame.gameId,
                    gameName: imageGame.gameName,
                    imageUrl: imageGame.imageUrl,
                };
            });

            return {imageGames, pageable: response.data.pageable, totalElements: response.data.totalElements, totalPages: response.data.totalPages};
        } else {
            throw new Error('Error listing image games: ' + response.status);
        }
    } catch (error) {
        console.error('Error listing image games:', error);
        Alert.alert('Error listing image games:' + (error as Error).message);
        throw error;
    }
}