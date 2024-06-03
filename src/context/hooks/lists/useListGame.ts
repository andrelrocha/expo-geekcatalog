import { useEffect, useState } from "react";
import useAuth from "../use-auth.hook";
import { getAllGameListByListID } from "../../../services/listsApp/getGameList";
import { addGameList } from "../../../services/gameList/addGameList";
import useGamesDropdown from "../games/useGamesDropdown";
import useConsolesDropdown from "../consoles/useConsolesDropdown";
import usePermissionsDropdown from "../permissions/usePermissionsDropdown";
import ImageUriList from "../../../types/image/ImageUriListDTO";
import GameListDTO from "../../../types/gameList/GameListDTO";
import GameListAddDTO from "../../../types/gameList/GameListAddDTO";
import { Alert } from "react-native";

type UseListGameProps = {
    size?: number;
    page?: number;
    sort?: string;  
    listId: string;
}

type PaginationInfo = {
    totalPages: number;
    currentPage: number;
    totalElements: number;
    pageSize: number;
}

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
    const [newGameAdded, setNewGameAdded] = useState(false);
    const [hideCreateButton, setHideCreateButton] = useState(false);
    const [consolesAvailableData, setConsolesAvailableData] = useState<any[]>([]);

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
        } catch (error) {
            console.error('Error fetching image games:', error);
        }
    }

    const createGameList = async (data: GameListAddDTO) => {
        try {
            setIsLoading(true);
            await addGameList(data);
            setIsLoading(false);
            Alert.alert('Game added successfully');
            setNewGameAdded(true);
            setModalAddIsOpen(false);
        } catch (error: any) {
            console.error('Error creating game list:', error);
            Alert.alert('Error creating game list: ', error.response?.data);
        }
    }

    //FALTA IMPLEMENTAR COM O SERVICE
    const addPermissionList = async (data: any) => {
        try {
            setIsLoading(true);
            console.log(data);
            setIsLoading(false);
            //Alert.alert('Permission added successfully');
        } catch (error: any) {
            console.error('Error adding permission list:', error);
            Alert.alert('Error adding permission list: ', error.response?.data);
        }
    }

    useEffect(() => {
        const fetchGamesList = async () => {
            loadGamesList();
        };

        fetchGamesList();
    }, [newGameAdded]);

    return { isLoading, paginationInfo, loadGamesList, gamesList, imageUris, grid, setGrid, gameDropwdownData, 
        createGameList, modalAddIsOpen, setModalAddIsOpen, permissionDropdownData, 
        addPermissionList, hideCreateButton, setHideCreateButton, setConsolesAvailableData, consolesAvailableData};
};

export default useListGame;
