import { useState } from "react";
import { createGame } from "../../../services/games/create";
import GameCreate from "../../../types/games/gameCreateDTO";
import { Alert } from "react-native";

export default function useGamesCreate() {
    const [isLoading, setIsLoading] = useState(false);
    const createGameMethod = async (gameData: GameCreate, navigate: () => void) => {
        setIsLoading(true);
        await createGame(gameData);
        setIsLoading(false);
        Alert.alert('Game created successfully!');
        navigate();
    }

    return {
        createGameMethod,
        isLoading,
    }
}