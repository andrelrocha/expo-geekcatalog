import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { getGameListById } from "../../../services/gameList/getById";
import { getGameInfoByGameListID } from "../../../services/gameList/getGameInfo";
import { updateGameList } from "../../../services/gameList/update";
import GameListReturnDTO from "../../../types/gameList/GameListReturnDTO";
import GameListGameInfoDTO from "../../../types/gameList/GameListGameInfo";

type GameListUpdate = {
    gameListId: string;
}

export default function useGameListUpdate(props: GameListUpdate) {
    const [isLoading, setIsLoading] = useState(false);
    const [gameList, setGameList] = useState<GameListReturnDTO>();
    const [gameInfo, setGameInfo] = useState<GameListGameInfoDTO>();

    const updateGameListMethod = async (gameListData: any, navigate: () => void) => {
        setIsLoading(true);
        try {
            const response = await updateGameList({ gameListId: props.gameListId, data: gameListData });
            Alert.alert(`Game ${response.gameName} updated successfully!`);
            navigate();
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to update game list.";
            Alert.alert('Error', 'An error occurred while updating game list: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const loadGameListInfo = async (gameListId: string) => {
        setIsLoading(true);
        try {
            const gameList = await getGameListById(gameListId);
            setGameList(gameList);
            const gameInfo = await getGameInfoByGameListID(gameListId);
            setGameInfo(gameInfo);
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to load game list.";
            Alert.alert('Error', 'An error occurred while loading game list: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchGameListInfo = async () => {
            await loadGameListInfo(props.gameListId);
        }
        fetchGameListInfo();
    }, []);

    return { isLoading, updateGameListMethod, loadGameListInfo, gameList, gameInfo };
}