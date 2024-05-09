import { useState } from "react";
import { createGame } from "../../../services/games/create";
import GameCreate from "../../../types/games/gameCreateDTO";

export default function useGamesCreate() {
    const [isLoading, setIsLoading] = useState(false);
    const createGameMethod = async (gameData: GameCreate) => {
        setIsLoading(true);
        await createGame(gameData);
        setIsLoading(false);
    }

    return {
        createGameMethod,
        isLoading,
    }
}