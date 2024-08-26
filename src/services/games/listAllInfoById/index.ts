import { ApiManager } from '../../../utils/API-axios/ApiManager';
import { getToken } from '../../../modules/auth.module';
import GameFullInfoUser from '../../../types/games/gameFullInfoUserDTO';

type HandleListAllInfoGamesProps = {
    gameId: string;
};

export const listAllGameInfoByGameIDUser = async (props: HandleListAllInfoGamesProps) => {
    try {
        const token = await getToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const endpoint = `/fullgame/user/info/${props.gameId}`;

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });

        if (response.data) {
            const data = response.data;

            const game: GameFullInfoUser = {
                id: data.id,
                name: data.name,
                metacritic: data.metacritic,
                yearOfRelease: data.yearOfRelease,
                genres: data.genres.map((genre: any) => genre),
                studios: data.studios.map((studio: any) => studio),
                consoles: data.consoles.map((console: any) => console),
                imageUrl: data.imageUrl,
                totalReviews: data.totalReviews,
                averageRating: Number(parseFloat(data.averageRating).toFixed(1))
            };
        
            return game;
        } else {
            throw new Error('Error mapping full game info to dto: ' + response);
        }
    } catch (error) {
        console.error('Error listing full game info: ', error);
        throw error;
    }
    }