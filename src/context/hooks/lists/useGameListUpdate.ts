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
            console.error('Error updating game list:', error);
            Alert.alert('Error updating game list!', error.response?.data || 'An error occurred while updating the game list.');
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
            console.error('Error loading game list info:', error);
            Alert.alert('Error loading game list info!', error.response?.data || 'An error occurred while loading the game list info.');
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