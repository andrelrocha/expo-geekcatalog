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
    const [gamesIdWithImage, setGamesIdWithImage] = useState<string[]>([]);
    const [imageUris, setImageUris] = useState<string[]>([]);

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

    const loadGameIdsForImageGames = async () => {
        try {
            const gameIdsResponse = await getImageGameGamesId();
            const gamesId = gameIdsResponse.map((gameId: any) => gameId.id);
            setGamesIdWithImage(gamesId);
            console.log('gamesId:', gamesId);
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
            console.log('gamesIdWithImage in load all image games:', gamesIdWithImage);
            const gamesId = await loadGameIdsForImageGames();
            const imageUris = await Promise.all(gamesId.map(loadImageGamesUri));
            return imageUris.filter(uri => uri !== undefined);
        } catch (error) {
            console.error('Error fetching all image games URIs:', error);
        }
    };
    
    useEffect(() => {
        loadData();
    }, [props.page]);

    useEffect(() => {
        const fetchGameIdsAndImages = async () => {
            await loadGameIdsForImageGames();
            console.log('gamesIdWithImage:', gamesIdWithImage);
            const imageUris = await loadAllImageGamesUri();
            console.log('imageUris:', imageUris);
            setImageUris(imageUris as string[]);
        };
        fetchGameIdsAndImages();
    }, []);

    return {games, fields, isLoading, paginationInfo, fieldsLabels, grid, setGrid, loadData, loadGameInfoData, imageUris};
}