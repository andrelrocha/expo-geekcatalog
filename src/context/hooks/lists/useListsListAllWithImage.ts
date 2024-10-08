import {  useState } from "react";
import { Alert } from "react-native";
import useAuth from "../use-auth.hook";
//import { listAllListsAppByUserID } from "../../../services/listsApp/getAllByUserID"; -- multiple calls to the API on a promise nesting
//import { listAllPublicListsByUserID } from "../../../services/listsApp/getPublic"; -- multiple calls to the API on a promise nesting
//import { listAllSharedLists } from "../../../services/listsApp/getSharedLists"; -- multiple calls to the API on a promise nesting
import { allListsAppByUserID } from "../../../services/listsApp/getAllFullInfoByUserID";
import { publicListsAppByUserID } from "../../../services/listsApp/getPublicFullInfo";
import { sharedListsAppByUserID } from "../../../services/listsApp/getSharedFullInfo";
import { deleteListGame } from "../../../services/listsApp/delete";
import ListCountReturn from "../../../types/listsApp/ListReturnDTO";
import ListReturn from "../../../types/listsApp/ListReturnDTO";
import PaginationInfo from "../../../types/utils/paginationInfo";

type UseListsListAllWithImageIDProps = {
    size?: number;
    page?: number;
    sort?: string;  
}

export default function useListsListAllWithImage(props: UseListsListAllWithImageIDProps){
    const [userLists, setUserLists] = useState<ListReturn[]>([]);
    const [publicLists, setPublicLists] = useState<ListCountReturn[]>([]);
    const [sharedLists, setSharedLists] = useState<ListCountReturn[]>([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [paginationUserListInfo, setPaginationUserListInfo] = useState<PaginationInfo>({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0,
        pageSize: 0
    });
    const [paginationPublicListInfo, setPaginationPublicListInfo] = useState<PaginationInfo>({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0,
        pageSize: 0
    });
    const [paginationSharedListInfo, setPaginationSharedListInfo] = useState<PaginationInfo>({
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

                const {lists, pageable, totalElements, totalPages} = await allListsAppByUserID(params);
                setUserLists(lists);
                
                setPaginationUserListInfo({
                    currentPage: pageable.pageNumber,
                    pageSize: pageable.pageSize,
                    totalPages: totalPages,
                    totalElements: totalElements,
                });
                setIsLoading(false);
            } catch (error: any) {
                const errorMessage = error.response?.data || error.message || "Failed to load user lists.";
                Alert.alert('Error', 'An error occurred while loading user lists: ' + errorMessage);
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

                const {lists, pageable, totalElements, totalPages} = await publicListsAppByUserID(params);
                setPublicLists(lists);
                setPaginationPublicListInfo({
                    currentPage: pageable.pageNumber,
                    pageSize: pageable.pageSize,
                    totalPages: totalPages,
                    totalElements: totalElements,
                });
                setIsLoading(false);
            } catch (error: any) {
                const errorMessage = error.response?.data || error.message || "Failed to load public lists.";
                Alert.alert('Error', 'An error occurred while loading public lists: ' + errorMessage);
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

                const {lists, pageable, totalElements, totalPages} = await sharedListsAppByUserID(params);
                setSharedLists(lists);
                setPaginationSharedListInfo({
                    currentPage: pageable.pageNumber,
                    pageSize: pageable.pageSize,
                    totalPages: totalPages,
                    totalElements: totalElements,
                });
                setIsLoading(false);
            } catch (error: any) {
                const errorMessage = error.response?.data || error.message || "Failed to load shared lists.";
                Alert.alert('Error', 'An error occurred while loading shared lists: ' + errorMessage);
            }
        }
    };

    const deleteList = async (id: any) => {
        await deleteListGame(id);
        Alert.alert('List deleted successfully');
        await loadDataUserLists();
    }

    return {userLists, publicLists, sharedLists, isLoading, paginationPublicListInfo, paginationSharedListInfo, paginationUserListInfo, loadDataUserLists, loadDataPublicLists, loadDataSharedLists, deleteList};
}