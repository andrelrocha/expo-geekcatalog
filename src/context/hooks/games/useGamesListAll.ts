import { useState } from "react";
import { listAllGameInfoByGameIDUser } from "../../../services/games/listAllInfoById";
import useAuth from "../use-auth.hook";
import { listAllImageGames } from "../../../services/imageGame/getAllPageable";

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
    const [grid, setGrid] = useState(false);
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

            console.log('imageGames on useGamesListAll', imageGames);
            setImageGames(imageGames);
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

    /*
    useEffect(() => {
        const fetchGameIdsAndImages = async () => {
            const imageUris = await loadAllImageGamesUri();
            setImageUris(imageUris);
        };

        fetchGameIdsAndImages();
    }, []);
    */

    return { isLoading, paginationInfo, imageGames, loadImageGames, grid, setGrid };
};

export default useGamesListAll;
