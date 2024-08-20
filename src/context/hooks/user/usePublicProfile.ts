import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getProfilePic } from "../../../services/user/getProfilePic";
import { getPublicInfoByUserId } from "../../../services/user/getPublicInfo";
import ListCountReturn from "../../../types/listsApp/ListWithImageReturnDTO";
import PaginationQuery from "../../../types/utils/paginationQuery";
import { publicListsAppByUserID } from "../../../services/listsApp/getPublicFullInfo";
import useAuth from "../use-auth.hook";
import PaginationInfo from "../../../types/utils/paginationInfo";
import { UserPublicInfo } from '../../../types/user/userPublicInfoDTO';

export default function usePublicProfile(userId: string) {
    const { authState } = useAuth();
    const { token } = authState;
    const [isLoading, setIsLoading] = useState(false);
    const [profilePicUri, setProfilePicUri] = useState('');
    const [publicLists, setPublicLists] = useState<ListCountReturn[]>([]);
    const [listsPagination, setListsPagination] = useState<PaginationQuery>({ page: 0, size: 10, sortField: 'createdAt', sortOrder: 'desc' });
    const [paginationPublicListInfo, setPaginationPublicListInfo] = useState<PaginationInfo>({currentPage: 0, pageSize: 0, totalPages: 0, totalElements: 0});
    const [publicUserInfo, setPublicUserInfo] = useState<UserPublicInfo | null>(null);

    const loadPublicInfo = async () => {
        try {
            setIsLoading(true);
            const response = await getPublicInfoByUserId(userId);
            if (!response) {
                throw new Error("Failed to load public info.");
            }
            setPublicUserInfo(response);
            setIsLoading(false);
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to load public info.";
            Alert.alert('Error', 'An error occurred while loading public info: ' + errorMessage);
        }
    }

    const fetchProfilePic = async () => {
        try {
            const response = await getProfilePic({ userId: userId || '' });
            if (response) {
                setProfilePicUri(response);
            }
        } catch (error) {
            console.error("Error fetching profile picture:", error);
        }   
    };

    const loadDataPublicLists = async () => {
        try {
            setIsLoading(true);

            const paramsToApi = `?page=${listsPagination.page}&size=${listsPagination.size}&sort={${listsPagination.sortField},${listsPagination.sortOrder}}`;
            
            const params ={
                token: token as string,
                params: paramsToApi,
                userId: userId as string
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

    useEffect(() => {   
        setProfilePicUri('');
        fetchProfilePic();
        loadPublicInfo();
        loadDataPublicLists();
    }, [userId]);

    return { profilePicUri, fetchProfilePic, setProfilePicUri, loadDataPublicLists, publicLists, isLoading, listsPagination, setListsPagination, 
        paginationPublicListInfo, setPaginationPublicListInfo, publicUserInfo };
}