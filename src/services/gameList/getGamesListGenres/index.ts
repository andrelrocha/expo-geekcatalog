import { ApiManager } from "../../../utils/API-axios/ApiManager";
import GenreCountDTO from "../../../types/genres/GenreCountDTO";
import { getToken } from "../../../modules/auth.module";

type HandleListAllGamesProps = {
    params: string;
};

export const getGameListGenresAndCount = async (props: HandleListAllGamesProps) => {
    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    let endpoint = '/gamelist/genres/ranked'

    if (props.params === '' || props.params === undefined) {
        endpoint += '/';
    } else {
        endpoint += "?" + props.params;
    }

    try {
        const response = await ApiManager.get(endpoint, { headers });

        if (response.data) {
            const content = response.data.content;
            const genres: GenreCountDTO[] = content.map((genre: any) => {
                return {
                    id: genre.genreId,
                    genreName: genre.genreName,
                    count: genre.count,
                };
            });
            console.log('Genres:', genres);
            return { genres, pageable: response.data.pageable, totalElements: response.data.totalElements, totalPages: response.data.totalPages };
        } else {
            throw new Error('Error getting game list genres and count: ' + response.status);
        }

    } catch (error) {
        console.error('Error getting game list genres and count:', error);
        throw error;
    }
}