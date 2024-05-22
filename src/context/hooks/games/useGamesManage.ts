import { useEffect, useState } from "react";
import useConsolesDropdown from "../consoles/useConsolesDropdown";
import useGenresDropdown from "../genres/useGenresDropdown";
import useStudiosDropdown from "../studios/useStudiosDropdown";
import { listAllGameInfoByGameIDAdmin } from "../../../services/games/listAllInfoAdminById";
import useAuth from "../use-auth.hook";
import GameFullInfoAdminDTO from "../../../types/games/gameFullInfoAdminDTO";
import { updateGame } from "../../../services/games/update";
import { Alert } from "react-native";
import { handleImageSelection } from "../../../services/image/getImageFromUser";
import { uploadImageGame } from "../../../services/imageGame/upload";

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

    const update = async (gameData: GameFullInfoAdminDTO, uri: string, navigate: () => void) => {
        try {
            setIsLoading(true);
            //ALTERAR AQUI P MANDAR JUNTO
            await updateGame(gameData);
            if (uri !== "") {
                await uploadImageGame({uri, gameId: gameData.id});
            }
            setIsLoading(false);
            Alert.alert('Game updated successfully!');
            navigate();
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Failed to update game!');
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
        isLoading,
        uri,
        setUri,
        modalPicVisible,
        setModalPicVisible,
        handleUserPicture,
        gameImageUri,
    }
}