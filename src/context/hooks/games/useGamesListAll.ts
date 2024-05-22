import { useEffect, useState } from "react";
import { listAllGameInfoByGameIDUser } from "../../../services/games/listAllInfoById";
import useAuth from "../use-auth.hook";
import { listAllImageGames } from "../../../services/imageGame/getAllPageable";
import ImageUriList from "../../../types/image/ImageUriListDTO";

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

const useGamesListAll = (props: UseGamesListAllProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const {authState} = useAuth();
    const {token} = authState;
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0,
        pageSize: 0
    });
    const [grid, setGrid] = useState(true);
    const [imageGames, setImageGames] = useState<any[]>([]);

    const handleParams = () => {
        let paramsToApi = '';
        if (props.size !== undefined) {
            paramsToApi += `size=${props.size}`;
        }

        if (props.page !== undefined) {
            paramsToApi += paramsToApi ? `&page=${props.page}` : `page=${props.page}`;
        }

        return paramsToApi;
    }

    const loadImageGames = async () => {
        try {
            setIsLoading(true);
            const paramsToApi = handleParams();

            const params ={
                token: token as string,
                params: paramsToApi
            }

            const { imageGames, pageable, totalElements, totalPages } = await listAllImageGames(params);

            const imageGameListFormat = imageGames.map((imageGame: any) => {
                const imageUriList: ImageUriList = {
                    id: imageGame.gameId,
                    uri: imageGame.imageUrl,
                    name: imageGame.gameName,
                };
                return imageUriList;
            });
            
            setImageGames(imageGameListFormat);
            setPaginationInfo({
                currentPage: pageable.pageNumber,
                pageSize: pageable.pageSize,
                totalPages: totalPages,
                totalElements: totalElements,
            });
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching image games:', error);
        }
    }

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

    useEffect(() => {
        const fetchImageGames = async () => {
            loadImageGames();
        };

        fetchImageGames();
    }, []);

    return { isLoading, paginationInfo, imageGames, loadImageGames, grid, setGrid, loadGameInfoData };
};

export default useGamesListAll;
