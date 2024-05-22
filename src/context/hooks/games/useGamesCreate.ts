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
import { uploadImageGame } from "../../../services/imageGame/upload";
 
export default function useGamesCreate() {
    const [isLoading, setIsLoading] = useState(false);
    const [uri, setUri] = useState("");
    const [modalPicVisible, setModalPicVisible] = useState(false);

    const handleUserPicture = async (mode: "gallery" | "camera" | undefined) => {
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

    const createGameMethod: (gameData: GameCreate, navigate: () => void) => Promise<void> = async (gameData, navigate) => {
        setIsLoading(true);
        
        const game = await createGame(gameData);

        if (game?.id) {
            if (gameData.consoles) {
                await handleGameConsoleCreate(game.id, gameData.consoles);
            }
            if (gameData.genres) {
                await handleGameGenreCreate(game.id, gameData.genres);
            }
            if (gameData.studios) {
                await handleGameStudioCreate(game.id, gameData.studios);
            }
            if (gameData.uri) {
                await uploadImageGame({ uri: gameData.uri, gameId: game.id });
            }
            
            setIsLoading(false);
            Alert.alert('Game created successfully!');
            navigate();
        } else {
            setIsLoading(false);
            Alert.alert('Failed to create game!');
        };
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
        handleUserPicture
    }
}