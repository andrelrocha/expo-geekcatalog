import { useEffect, useState } from "react";
import { listAllGames } from "../../../services/games/listAll";
import GameReturn from "../../../types/games/gameReturnDTO";
import useAuth from "../use-auth.hook";
import { listAllGameInfoByGameIDUser } from "../../../services/games/listAllInfoById";
import { getImageGameGamesId } from "../../../services/imageGame/getGamesId";
import { getImageGame } from "../../../services/imageGame/getByGameId";

type UseGamesListAllProps = {
    size?: number;
    page?: number;
    sort?: string;  
}

type PaginationInfo = {
    totalPages: number;
    currentPage: number;
    totalElements: number;
    pageSize: number;
}

type ImageUri = {
    id: string;
    uri: string;
}

export default function useGamesListAll(props: UseGamesListAllProps){
    const [games, setGames] = useState<GameReturn[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0,
        pageSize: 0
    });
    const [grid, setGrid] = useState(false);

    const fields = ['metacritic', 'yearOfRelease'];
    const fieldsLabels = ['Metacritic', 'Year of Release'];

    const { authState } = useAuth();
    const { token } = authState;

    const handleParams = () => {
        let paramsToApi = '';
        if (props.size !== undefined) {
            paramsToApi += `size=${props.size}`;
        }

        if (props.page !== undefined) {
            paramsToApi += paramsToApi ? `&page=${props.page}` : `page=${props.page}`;
        }

        if (props.sort !== undefined) {
            paramsToApi += paramsToApi ? `&sort=${props.sort}` : `sort=${props.sort}`;
        }

        return paramsToApi;
    }

    const loadData = async () => {
        try {
            setIsLoading(true);
            
            const paramsToApi = handleParams();

            const params ={
                token: token as string,
                params: paramsToApi
            }

            const {games, pageable, totalElements, totalPages} = await listAllGames(params);
            setGames(games);
            setPaginationInfo({
                currentPage: pageable.pageNumber,
                pageSize: pageable.pageSize,
                totalPages: totalPages,
                totalElements: totalElements,
            });
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    const loadGameInfoData = async (gameId: string) => {
        try {
            setIsLoading(true);
            const gameInfo = await listAllGameInfoByGameIDUser({gameId, token: token as string});
            setIsLoading(false);
            return gameInfo;
        } catch (error) {
            console.error('Error fetching full game info:', error);
        }
    }

    
    const [imageUris, setImageUris] = useState<ImageUri[]>([]);

    const loadGameIdsForImageGames = async () => {
        try {
            const gameIdsResponse = await getImageGameGamesId();
            const gamesId = gameIdsResponse.map((gameId: any) => gameId.id);
            return gamesId;
        } catch (error) {
            console.error('Error fetching game ids for image games:', error);
        }
    }
    
    const loadImageGamesUri = async (gameId: string) => {
        try {
            const image = await getImageGame({gameId});
            return image;
        } catch (error) {
            console.error('Error fetching image game:', error);
        }
    };
    
    const loadAllImageGamesUri = async () => {
        try {
            setIsLoading(true);
            const gamesId = await loadGameIdsForImageGames();
            const imageUris = await Promise.all(gamesId.map(loadImageGamesUri));
            
            const filteredImageUris = imageUris.filter(uri => uri !== undefined);
            
            const gamesWithImages = gamesId.reduce((acc: any, gameId: string, index: number) => {
                if (filteredImageUris[index]) {
                    acc.push({ id: gameId, uri: filteredImageUris[index] });
                }
                return acc;
            }, []);

            setIsLoading(false);
            
            return gamesWithImages;
        } catch (error) {
            console.error('Error fetching all image games URIs:', error);
        }
    };
    useEffect(() => {
        const fetchGameIdsAndImages = async () => {
            const imageUris = await loadAllImageGamesUri();
            
            const modifiedImageUris = imageUris.map((item: ImageUri) => ({
                id: item.id, 
                uri: item.uri 
            }));
    
            setImageUris(modifiedImageUris);
        };
    
        fetchGameIdsAndImages();
    }, []);
    

    useEffect(() => {
        loadData();
    }, [props.page]);

    return {games, fields, isLoading, paginationInfo, fieldsLabels, grid, setGrid, loadData, loadGameInfoData, imageUris};
}