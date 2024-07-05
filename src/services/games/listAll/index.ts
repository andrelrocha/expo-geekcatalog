import { ApiManager } from '../../../utils/API-axios/ApiManager';
import GameReturn from '../../../types/games/gameReturnDTO'

type HandleListAllGamesProps = {
    params: string;
    token: string;
};

export const listAllGames = async (props: HandleListAllGamesProps) => {
    try {
        const headers = {
            'Authorization': `Bearer ${props.token}`
        }

        let endpoint = "/games/all";
        
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
                throw error;
            });
    
        if (response.data) {
            const content = response.data.content;
            const games: GameReturn[] = content.map((game: any) => {
                return {
                    id: game.id,
                    name: game.name,
                    metacritic: game.metacritic,
                    yearOfRelease: game.yearOfRelease,
                };
            });
            
            return {games, pageable: response.data.pageable, totalElements: response.data.totalElements, totalPages: response.data.totalPages};
        } else {
            throw new Error('Error mapping games to dto: ' + response.status);
        }
    } catch (error) {
        console.error('Error listing games:', error);
        throw error;
    }
    }