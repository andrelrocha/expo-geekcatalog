import { useEffect, useState } from "react";
import { listAllGames } from "../../../services/games/listAll";
import GameReturn from "../../../types/games/gameReturnDTO";
import useAuth from "../use-auth.hook";

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

    useEffect(() => {
        const fetchGames = async () => {
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
                console.error('Erro ao buscar jogos:', error);
            }
        };

        fetchGames();
    }, [props.page]);

    return {games, isLoading, paginationInfo};
}