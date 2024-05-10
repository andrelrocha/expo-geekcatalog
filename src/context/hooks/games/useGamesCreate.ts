import { useState } from "react";
import { createGame } from "../../../services/games/create";
import GameCreate from "../../../types/games/gameCreateDTO";
import { Alert } from "react-native";
import useConsolesDropdown from "../consoles/useConsolesDropdown";
import useGenresDropdown from "../genres/useGenresDropdown";
import useStudiosDropdown from "../studios/useStudiosDropdown";

export default function useGamesCreate() {
    const [isLoading, setIsLoading] = useState(false);
    const createGameMethod = async (gameData: GameCreate, navigate: () => void) => {
        setIsLoading(true);
        await createGame(gameData);
        setIsLoading(false);
        Alert.alert('Game created successfully!');
        navigate();
    }

    const { dropdownData: consolesData } = useConsolesDropdown();
    const { dropdownData: genresData } = useGenresDropdown();
    const { dropdownData: studiosData } = useStudiosDropdown();

    return {
        createGameMethod,
        consolesData,
        genresData,
        studiosData,
        isLoading,
    }
}