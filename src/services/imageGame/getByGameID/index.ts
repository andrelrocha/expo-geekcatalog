import { Alert } from 'react-native';
import { ApiManager } from '../../../utils/API-axios/ApiManager';
import ImageGame from '../../../types/imageGame/imageGameDTO';

type HandleListAllImageGamesProps = {
    token: string;
    gameId: string;
};

export const getByGameID = async (props: HandleListAllImageGamesProps) => {
    try {
        const headers = {
            'Authorization': `Bearer ${props.token}`
        }

        let endpoint = `/imagegame/game/${props.gameId}`;

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error listing image game:', error);
                throw error;
            });

        if (response.data) {
            const content = response.data;

            const imageGame: ImageGame = {
                gameId: content.gameId,
                gameName: content.gameName,
                imageUrl: content.imageUrl,
            }

            return imageGame;
        } else {
            throw new Error('Error listing image game by gameid: ' + response.status);
        }
    } catch (error) {
        console.error('Error listing image game by gameid:', error);
        Alert.alert('Error listing image game by gameid:' + (error as Error).message);
        throw error;
    }
}