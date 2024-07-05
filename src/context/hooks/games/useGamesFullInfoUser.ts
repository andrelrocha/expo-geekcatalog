import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listAllGameInfoByGameIDUser } from "../../../services/games/listAllInfoById";
import { addGameRating } from "../../../services/gameRating/add";
import { getUserRatingByGame } from "../../../services/gameRating/getByUserAndGame";
import GameFullInfoUser from "../../../types/games/gameFullInfoUserDTO";
import AddGameRatingDTO from "../../../types/gameRating/AddGameRating";

export const useGamesFullInfoUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [gameInfo, setGameInfo] = useState<GameFullInfoUser | null>(null);
    const [modalRatingVisible, setModalRatingVisible] = useState(false);
    const [gameRating, setGameRating] = useState(0);
    const [userRatingAdded, setUserRatingAdded] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const loadGameInfoData = async (gameId: string) => {
        try {
            setIsLoading(true);
            const gameInfo = await listAllGameInfoByGameIDUser({gameId});
            setGameInfo(gameInfo);
            return gameInfo;
        } catch (error: any) {
            const erorrMessage = error.response?.data || error.message || "Failed to load game info.";
            Alert.alert('Error', 'An error occurred while loading game info: ' + erorrMessage);
        } finally {
            setIsLoading(false);
        }
    }  

    const addGameRatingMethod = async (data: AddGameRatingDTO) => {
        try {
            setIsLoading(true);
            const gameRating = await addGameRating(data);
            Alert.alert('Rating added successfully');
            setUserRatingAdded(true);
            return gameRating;
        } catch (error: any) {
            const erorrMessage = error.response?.data || error.message || "Failed to add rating.";
            Alert.alert('Error', 'An error occurred while adding rating: ' + erorrMessage);
        } finally {
            setIsLoading(false);
            setUserRatingAdded(false);
        }
    }

    const getUserRating = async (gameId: string) => {
        try {
            setIsLoading(true);
            const userRating = await getUserRatingByGame({gameId});
            setUserRating(userRating.rating);
            return userRating;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to get user rating.";
            Alert.alert('Error', 'An error occurred while getting user rating: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchUserRating = async () => {
            if (modalRatingVisible) {
                const rating = await getUserRating(gameInfo?.id as string);
                if (rating) {
                    setGameRating(rating.rating / 2);
                }
            }
        }
        fetchUserRating();
    }, [modalRatingVisible, gameInfo]);


    return { isLoading, gameInfo, loadGameInfoData, modalRatingVisible, setModalRatingVisible,
        gameRating, setGameRating, addGameRatingMethod, userRatingAdded, userRating };
}