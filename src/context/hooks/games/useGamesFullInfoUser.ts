import { useState } from "react";
import { listAllGameInfoByGameIDUser } from "../../../services/games/listAllInfoById";
import { addGameRating } from "../../../services/gameRating";
import GameFullInfoUser from "../../../types/games/gameFullInfoUserDTO";
import AddGameRatingDTO from "../../../types/gameRating/AddGameRating";
import { Alert } from "react-native";

export const useGamesFullInfoUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [gameInfo, setGameInfo] = useState<GameFullInfoUser | null>(null);
    const [modalRatingVisible, setModalRatingVisible] = useState(false);
    const [gameRating, setGameRating] = useState(0);

    const loadGameInfoData = async (gameId: string) => {
        try {
            setIsLoading(true);
            const gameInfo = await listAllGameInfoByGameIDUser({gameId});
            setGameInfo(gameInfo);
            return gameInfo;
        } catch (error) {
            console.error('Error fetching full game info:', error);
        } finally {
            setIsLoading(false);
        }
    }  

    const addGameRatingMethod = async (data: AddGameRatingDTO) => {
        try {
            setIsLoading(true);
            const gameRating = await addGameRating(data);
            Alert.alert('Rating added successfully');
            return gameRating;
        } catch (error) {
            console.error('Error adding game rating:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, gameInfo, loadGameInfoData, modalRatingVisible, setModalRatingVisible, gameRating, setGameRating, addGameRatingMethod };
}