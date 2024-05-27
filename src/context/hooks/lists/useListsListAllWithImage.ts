import { useEffect, useState } from "react";
import useAuth from "../use-auth.hook";
import { listAllListsAppByUserID } from "../../../services/listsApp/getAllByUserID";
import { listAllPublicListsByUserID } from "../../../services/listsApp/getAllPublic";
import { listAllSharedLists } from "../../../services/listsApp/getAllSharedLists";
import ListCountReturn from "../../../types/listsApp/ListReturnDTO";
import ListReturn from "../../../types/listsApp/ListReturnDTO";

type UseListsListAllWithImageIDProps = {
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

export default function useListsListAllWithImage(props: UseListsListAllWithImageIDProps){
    const [userLists, setUserLists] = useState<ListReturn[]>([]);
    const [publicLists, setPublicLists] = useState<ListCountReturn[]>([]);
    const [sharedLists, setSharedLists] = useState<ListCountReturn[]>([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0,
        pageSize: 0
    });

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

    const loadDataUserLists = async () => {
        if (currentUser) {
            try {
                setIsLoading(true);
                
                const paramsToApi = handleParams();

                const params ={
                    token: token as string,
                    params: paramsToApi,
                    userId: currentUser.id as string
                }

                const {lists, pageable, totalElements, totalPages} = await listAllListsAppByUserID(params);
                setUserLists(lists);
                
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

    const loadDataPublicLists = async () => {
        if (currentUser) {
            try {
                setIsLoading(true);
                
                const paramsToApi = handleParams();

                const params ={
                    token: token as string,
                    params: paramsToApi,
                    userId: currentUser.id as string
                }

                const {lists, pageable, totalElements, totalPages} = await listAllPublicListsByUserID(params);
                setPublicLists(lists);
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

    const loadDataSharedLists = async () => {
        if (currentUser) {
            try {
                setIsLoading(true);
                
                const paramsToApi = handleParams();

                const params ={
                    token: token as string,
                    params: paramsToApi,
                    userId: currentUser.id as string
                }

                const {lists, pageable, totalElements, totalPages} = await listAllSharedLists(params);
                setSharedLists(lists);
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

    //AJEITAR QUESTÃO DELE FAZER O LOAD DE TODOS DE UMA VEZ, SÓ DEVE FAZER POR TELA ABERTA
    useEffect(() => {
        if (!currentUser) return;
        loadDataPublicLists();
        loadDataSharedLists();
        loadDataUserLists();
    }, [props.page, currentUser]);    

    return {userLists, publicLists, sharedLists, isLoading, paginationInfo, loadDataUserLists, loadDataPublicLists, loadDataSharedLists};
}