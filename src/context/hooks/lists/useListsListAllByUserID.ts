import { useEffect, useState } from "react";
import useAuth from "../use-auth.hook";
import { listAllListsAppByUserID } from "../../../services/listsApp/getAllByUserID";
import ListGameCountReturn from "../../../types/listsApp/ListsAppCountReturnDTO";

type UseListsListAllByUserIDProps = {
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

export default function useListsListAllByUserID(props: UseListsListAllByUserIDProps){
    const [lists, setLists] = useState<ListGameCountReturn[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0,
        pageSize: 0
    });

    //const fields = ['metacritic', 'yearOfRelease'];
    //const fieldsLabels = ['Metacritic', 'Year of Release'];

    const { authState, currentUser } = useAuth();
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
        if (currentUser && token) {
            try {
                setIsLoading(true);
                
                const paramsToApi = handleParams();

                const params ={
                    token: token as string,
                    params: paramsToApi,
                    userId: currentUser.id as string
                }

                const {lists, pageable, totalElements, totalPages} = await listAllListsAppByUserID(params);
                setLists(lists);
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
        }
    };

    useEffect(() => {
        loadData();
    }, [props.page]);

    return {lists, isLoading, paginationInfo, loadData};
}