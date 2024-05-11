import { useState } from "react";
import { createGame } from "../../../services/games/create";
import { createGameConsole } from "../../../services/gameConsole/create";
import GameCreate from "../../../types/games/gameCreateDTO";
import { Alert } from "react-native";
import useConsolesDropdown from "../consoles/useConsolesDropdown";
import useGenresDropdown from "../genres/useGenresDropdown";
import useStudiosDropdown from "../studios/useStudiosDropdown";
import { createGameGenre } from "../../../services/gameGenre/create";
import { createGameStudio } from "../../../services/gameStudio/create";
import { handleImageSelection } from "../../../services/image/getImageFromUser";
import { saveImageGame } from "../../../services/imageGame/create";

export default function useGamesCreate() {
    const [isLoading, setIsLoading] = useState(false);
    const [uri, setUri] = useState("");
    const [modalPicVisible, setModalPicVisible] = useState(false);

    const handleProfilePicture = async (mode: "gallery" | "camera" | undefined) => {
        const uri = await handleImageSelection({ mode: mode });
        setUri(uri as string);
      }

    const handleGameConsoleCreate = async (gameId: string, consoles: string[]) => {
        for (const consoleId of consoles) {
            const createGameConsoleData = {
                gameId,
                consoleId,
            };
            await createGameConsole(createGameConsoleData);
        }
    }

    const handleGameGenreCreate = async (gameId: string, genres: string[]) => {
        for (const genreId of genres) {
            const createGameGenreData = {
                gameId,
                genreId,
            };
            await createGameGenre(createGameGenreData);
        }
    }

    const handleGameStudioCreate = async (gameId: string, studios: string[]) => {
        for (const studioId of studios) {
            const createGameStudioData = {
                gameId,
                studioId,
            };
            await createGameStudio(createGameStudioData);
        }
    }

    const createGameMethod = async (gameData: GameCreate, navigate: () => void) => {
        setIsLoading(true);
        
        const game = await createGame(gameData);

        if (game?.id) {
            await handleGameConsoleCreate(game.id, gameData.consoles);
            await handleGameGenreCreate(game.id, gameData.genres);
            await handleGameStudioCreate(game.id, gameData.studios);
            await saveImageGame({ uri: gameData.uri, gameId: game.id });
        }

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
        uri,
        setUri,
        modalPicVisible,
        setModalPicVisible,
        handleProfilePicture
    }
}