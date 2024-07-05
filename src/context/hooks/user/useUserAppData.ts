import { Alert } from "react-native";
import { getGameListGenresAndCount } from "../../../services/gameList/getGamesListGenres";
import GenreCountDTO from "../../../types/genres/GenreCountDTO";
import { useEffect, useState } from "react";
import PaginationInfo from "../../../types/utils/paginationInfo";

type UseUserAppDataProps = {
    size?: number;
    page?: number;
    sort?: string;  
}

export default function useUserAppData(props: UseUserAppDataProps) {
    const [genresCount, setGenresCount] = useState<GenreCountDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0,
        pageSize: 0
    });
    const fields = ['count'];
    const fieldsLabels = ['Count'];

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

    const getGameListGenres = async () => {
        setIsLoading(true);
        try {
            const paramsToApi = handleParams();

            const params ={
                params: paramsToApi
            }

            const { genres, pageable, totalElements, totalPages } = await getGameListGenresAndCount(params);
            setGenresCount(genres);
            setPaginationInfo({
                currentPage: pageable.pageNumber,
                pageSize: pageable.pageSize,
                totalPages: totalPages,
                totalElements: totalElements
            });
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to get genres count";
            Alert.alert('Error', 'An error occurred while getting genres count: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getGameListGenres();
    }, [props.page]);

    return {
        getGameListGenres, genresCount, fields, fieldsLabels, isLoading, paginationInfo
    };
}