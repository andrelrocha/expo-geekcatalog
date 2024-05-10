import { useState } from "react";
import { createGame } from "../../../services/games/create";
import { createGameConsole } from "../../../services/gameConsole/create";
import GameCreate from "../../../types/games/gameCreateDTO";
import { Alert } from "react-native";
import useConsolesDropdown from "../consoles/useConsolesDropdown";
import useGenresDropdown from "../genres/useGenresDropdown";
import useStudiosDropdown from "../studios/useStudiosDropdown";

export default function useGamesCreate() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGameConsoleCreate = async (gameId: string, consoles: string[]) => {
        for (const consoleId of consoles) {
            const createGameConsoleData = {
                gameId,
                consoleId,
            };
            await createGameConsole(createGameConsoleData);
        }
    }

    const createGameMethod = async (gameData: GameCreate, navigate: () => void) => {
        setIsLoading(true);

        //const game = await createGame(gameData);

        console.log(gameData);
        handleGameConsoleCreate('f2c40adc-64c8-4cac-8547-5e5778d04166', gameData.consoles);
        

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