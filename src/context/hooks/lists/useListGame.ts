import { Alert } from "react-native";
import { useEffect, useState } from "react";
import useAuth from "../use-auth.hook";
import { getAllGameListByListID } from "../../../services/listsApp/getGameList";
import { addGameList } from "../../../services/gameList/addGameList";
import { addBulkGameListPermission } from "../../../services/listsPermission/addBulkGameListPermission";
import { deleteAllListPermission } from "../../../services/listsPermission/deleteAllListPermission";
import { deleteGameList } from "../../../services/gameList/delete";
import { getListPermissionsByUser } from "../../../services/listsPermission/getListPermissionsByUser";
import { getGameListById } from "../../../services/gameList/getById";
import useGamesDropdown from "../games/useGamesDropdown";
import usePermissionsDropdown from "../permissions/usePermissionsDropdown";
import ImageUriList from "../../../types/image/ImageUriListDTO";
import GameListDTO from "../../../types/gameList/GameListDTO";
import GameListAddDTO from "../../../types/gameList/GameListAddDTO";
import GameListReturnDTO from "../../../types/gameList/GameListReturnDTO";
import PaginationInfo from "../../../types/utils/paginationInfo";

type UseListGameProps = {
    size?: number;
    page?: number;
    sort?: string;  
    listId: string;
}

type AlertOptions = {  
    label: string;
    icon?: React.ReactNode;
    onPress: () => void;
};

const useListGame = (props: UseListGameProps) => {
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
    const [gamesList, setGamesList] = useState<GameListDTO[]>([]);
    const [imageUris, setImageUris] = useState<ImageUriList[]>([]);
    const [modalAddIsOpen, setModalAddIsOpen] = useState(false);
    const [gameListDataChange, setgameListDataChange] = useState(false);
    const [hideCreateButton, setHideCreateButton] = useState(false);
    const [consolesAvailableData, setConsolesAvailableData] = useState<any[]>([]);
    const [permissionModalOpen, setPermissionModalOpen] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [selectedGameList, setSelectedGameList] = useState('');
    const [userPermissions, setUserPermissions] = useState<string[]>([]);
    const [deleteInvite, setDeleteInvite] = useState(false);
    const [modalInfoVisibible, setModalInfoVisible] = useState(false);
    const [gameListInfo, setGameListInfo] = useState<GameListReturnDTO | null>(null);
    const alertOption: AlertOptions[] = [];

    const { dropdownData: gameDropwdownData } = useGamesDropdown();
    const { dropdownData: permissionDropdownData } = usePermissionsDropdown();

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

    const loadGamesList = async () => {
        try {
            setIsLoading(true);
            const paramsToApi = handleParams();

            const params ={
                token: token as string,
                params: paramsToApi,
                listId: props.listId
            }

            const { gameLists, pageable, totalElements, totalPages } = await getAllGameListByListID(params);
            setGamesList(gameLists);
            setPaginationInfo({
                currentPage: pageable.pageNumber,
                pageSize: pageable.pageSize,
                totalPages: totalPages,
                totalElements: totalElements,
            });

            setImageUris(gameLists.map((game) => {
                return {
                    id: game.id,
                    uri: game.uri,
                    name: game.gameName
                }
            }));

            setIsLoading(false);
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to load games in a list.";
            Alert.alert('Error', 'An error occurred while loading games in a list: ' + errorMessage);
        }
    }

    const loadGameListInfo = async (id: string) => {
        try {
            setIsLoading(true);
            const gameList = await getGameListById(id);
            setGameListInfo(gameList);
            return gameList;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to load game list.";
            Alert.alert('Error', 'An error occurred while loading game list: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const createGameList = async (data: GameListAddDTO) => {
        try {
            setIsLoading(true);
            await addGameList(data);
            Alert.alert('Game added successfully');
            setgameListDataChange(true);
            setModalAddIsOpen(false);
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to add game to list.";
            Alert.alert('Error', 'An error occurred while adding game to list: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteGameListMethod = async (id: string) => {
        try {
            setIsLoading(true);
            await deleteGameList(id);
            Alert.alert('Game deleted successfully');
            setgameListDataChange(true);
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to delete game from list.";
            Alert.alert('Error', 'An error occurred while deleting game from list: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const getUserPermissions = async () => {
        try {
            setIsLoading(true);
            const permissionsList = await getListPermissionsByUser(props.listId);
            if (permissionsList) setUserPermissions(permissionsList.map((permission) => permission.permissionName));
            return permissionsList;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to load permissions.";
            Alert.alert('Error', 'An error occurred while loading permissions: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const addPermissionsList = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await addBulkGameListPermission(data);
            if (response && response.length > 0) {
                const participantName = response[0].participantName;
                Alert.alert(`Permission for user ${participantName} added successfully`);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to add permissions.";
            Alert.alert('Error', 'An error occurred while adding permissions: ' + errorMessage);
        } finally{
            setIsLoading(false);
            setPermissionModalOpen(false);
        }
    }

    const deletePermissionList = async (participantEmail: string) => {
        try {
            setIsLoading(true);
            await deleteAllListPermission({participantEmail, listId: props.listId});
            Alert.alert('Permissions deleted successfully');
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to delete permissions.";
            Alert.alert('Error', 'An error occurred while deleting permissions: ' + errorMessage);
        } finally{
            setIsLoading(false);
            setPermissionModalOpen(false);
        }
    }

    useEffect(() => {
        const fetchGamesList = async () => {
            loadGamesList();
        };

        fetchGamesList();
        setgameListDataChange(false);
    }, [gameListDataChange]);

    useEffect(() => {
        const fetchUserPermissions = async () => {
            getUserPermissions();
        }
        fetchUserPermissions();
    }, []);

    return { isLoading, paginationInfo, loadGamesList, gamesList, imageUris, grid, setGrid, gameDropwdownData, isAlertVisible, setAlertVisible, userPermissions, deleteInvite, setDeleteInvite,
        createGameList, deleteGameListMethod, modalAddIsOpen, setModalAddIsOpen, permissionDropdownData, permissionModalOpen, setPermissionModalOpen, alertOption,
        addPermissionsList, deletePermissionList, hideCreateButton, setHideCreateButton, setConsolesAvailableData, consolesAvailableData, selectedGameList, setSelectedGameList,
        modalInfoVisibible, setModalInfoVisible, gameListInfo, setGameListInfo, loadGameListInfo};
};

export default useListGame;
