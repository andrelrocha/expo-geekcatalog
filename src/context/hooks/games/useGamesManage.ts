import { useState } from "react";
import { Alert } from "react-native";
import useConsolesDropdown from "../consoles/useConsolesDropdown";
import useGenresDropdown from "../genres/useGenresDropdown";
import useStudiosDropdown from "../studios/useStudiosDropdown";
import { listAllGameInfoByGameIDAdmin } from "../../../services/games/listAllInfoAdminById";
import useAuth from "../use-auth.hook";
import { updateGame } from "../../../services/games/update";
import { deleteGame } from "../../../services/games/delete";
import { handleImageSelection } from "../../../services/image/getImageUserExpoManipulator";
import { uploadImageGame } from "../../../services/imageGame/upload";
import UpdateGameFullInfoAdminDTO from "../../../types/games/updateGameFullInfoAdminDTO";

export default function useGamesManage() {
    const [editEnabled, setEditEnabled] = useState(false);
    const [ valueSelectedConsole, setValueSelectedConsole ] = useState<string[]>([]);
    const [ valueSelectedGenre, setValueSelectedGenre ] = useState<string[]>([]);
    const [ valueSelectedStudio, setValueSelectedStudio ] = useState<string[]>([]);
    const [ gameId, setGameId ] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uri, setUri] = useState("");
    const [gameImageUri, setGameImageUri] = useState("");
    const [modalPicVisible, setModalPicVisible] = useState(false);

    const { authState } = useAuth();
    const { token } = authState;

    const { dropdownData: consolesData } = useConsolesDropdown();
    const { dropdownData: genresData } = useGenresDropdown();
    const { dropdownData: studiosData } = useStudiosDropdown();

    const loadGameInfoData = async (gameId: string) => {
        const params ={
            token: token as string,
            gameId: gameId
        }
        const gameInfo = await listAllGameInfoByGameIDAdmin(params);

        return gameInfo;
    }

    const update = async (gameData: UpdateGameFullInfoAdminDTO, uri: string, navigate: () => void) => {
        try {  
            const updatedStudios = [...new Set([...valueSelectedStudio, ...gameData.studios])];
            const updatedGenres = [...new Set([...valueSelectedGenre, ...gameData.genres])];
            const updatedConsoles = [...new Set([...valueSelectedConsole, ...gameData.consoles])];

            const studios = gameData.studios.length > 0 ? updatedStudios.filter((studio: string) => gameData.studios.includes(studio)) : valueSelectedStudio;
            const genres = gameData.genres.length > 0 ? updatedGenres.filter((genre: string) => gameData.genres.includes(genre)) : valueSelectedGenre;
            const consoles = gameData.consoles.length > 0 ? updatedConsoles.filter((console: string) => gameData.consoles.includes(console)) : valueSelectedConsole;

            const updatedGameData = {
                ...gameData,
                studios,
                genres,
                consoles
            }

            setIsLoading(true);
            await updateGame(updatedGameData);
            if (uri !== "") {
                try {
                    await uploadImageGame({uri, gameId: gameData.id});
                } catch (error: any) {
                    const errorMessage = error.response?.data || error.message || "Failed to update game image.";
                    Alert.alert('Error', 'An error occurred while updating game image: ' + errorMessage);
                }
            }
            setIsLoading(false);
            Alert.alert('Game updated successfully!');
            navigate();
        } catch (error: any) {
            setIsLoading(false);
            const errorMessage = error.response?.data || error.message || "Failed to update game.";
            Alert.alert('Error', 'An error occurred while updating game: ' + errorMessage);
        }
    }

    const deleteGameMethod = async (gameId: string) => {
        try {
            setIsLoading(true);
            await deleteGame({gameId});
            Alert.alert('Game deleted successfully!');
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to delete game.";
            Alert.alert('Error', 'An error occurred while deleting game: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const handleUserPicture = async (mode: "gallery" | "camera" | undefined) => {
        const uri = await handleImageSelection({ mode: mode });
        setUri(uri as string);
      }

    return {
        consolesData,
        genresData,
        studiosData,
        editEnabled,
        setEditEnabled,
        loadGameInfoData,
        valueSelectedConsole,
        setValueSelectedConsole,
        valueSelectedGenre,
        setValueSelectedGenre,
        valueSelectedStudio,
        setValueSelectedStudio,
        gameId,
        setGameId,
        update,
        deleteGameMethod,
        isLoading,
        uri,
        setUri,
        modalPicVisible,
        setModalPicVisible,
        handleUserPicture,
        gameImageUri,
    }
}