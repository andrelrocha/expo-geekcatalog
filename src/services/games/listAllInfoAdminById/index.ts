import { Alert } from 'react-native';
import { ApiManager } from '../../../utils/API-axios/ApiManager';
import GameFullInfo from '../../../types/games/gameFullInfoUserDTO';
import GameFullInfoAdminDTO from '../../../types/games/gameFullInfoAdminDTO';

type HandleListAllInfoGamesProps = {
    token: string;
    gameId: string;
};

export const listAllGameInfoByGameIDAdmin = async (props: HandleListAllInfoGamesProps) => {
    try {
        const headers = {
            'Authorization': `Bearer ${props.token}`
        }

        const endpoint = `/fullgame/admin/info/${props.gameId}`;

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error listing full game info:', error);
                throw error;
            });

        if (response.data) {
            const data = response.data;
            

            const game: GameFullInfoAdminDTO = {
                id: data.id,
                name: data.name,
                metacritic: data.metacritic,
                yearOfRelease: data.yearOfRelease,
                genres: data.genres.map((genre: any) => genre),
                studios: data.studios.map((studio: any) => studio),
                consoles: data.consoles.map((console: any) => console),
            };
        
            return game;
        } else {
            throw new Error('Error listing full game info: ' + response);
        }
    } catch (error) {
        console.error('Error listing full game info: ', error);
        Alert.alert('Error listing full game info: ' + (error as Error).message);
        throw error;
    }
    }