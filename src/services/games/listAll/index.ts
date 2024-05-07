import { Alert } from 'react-native';
import { ApiManager } from '../../../utils/API-axios/ApiManager';
import GameReturn from '../../../types/games/gameReturnDTO'

type HandleListAllGamesProps = {
    params: string;
    token: string;
};

export const listAllGames = async (props: HandleListAllGamesProps) => {
    try {
        if (props.token === null) {
            throw new Error('Token inválido');
        }

        const headers = {
            'Authorization': `Bearer ${props.token}`
        }

        let endpoint = "/games/getall";
        
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
                console.error('Erro ao listar os jogos:', error);
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
            throw new Error('Erro ao listar jogos: ' + response.status);
        }
    } catch (error) {
        console.error('Erro ao listar jogos:', error);
        Alert.alert('Erro ao listar jogos:' + (error as Error).message);
        throw error;
    }
    }