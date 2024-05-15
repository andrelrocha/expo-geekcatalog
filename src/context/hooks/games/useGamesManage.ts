import { useState } from "react";
import useConsolesDropdown from "../consoles/useConsolesDropdown";
import useGenresDropdown from "../genres/useGenresDropdown";
import useStudiosDropdown from "../studios/useStudiosDropdown";
import { listAllGameInfoByGameIDAdmin } from "../../../services/games/listAllInfoAdminById";
import useAuth from "../use-auth.hook";
import GameFullInfoAdminDTO from "../../../types/games/gameFullInfoAdminDTO";
import { updateGame } from "../../../services/games/update";
import { Alert } from "react-native";

export default function useGamesManage() {
    const [editEnabled, setEditEnabled] = useState(false);
    const [ valueSelectedConsole, setValueSelectedConsole ] = useState<string[]>([]);
    const [ valueSelectedGenre, setValueSelectedGenre ] = useState<string[]>([]);
    const [ valueSelectedStudio, setValueSelectedStudio ] = useState<string[]>([]);
    const [ gameId, setGameId ] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    const update = async (gameData: GameFullInfoAdminDTO, navigate: () => void) => {
        try {
            setIsLoading(true);
            await updateGame(gameData);
            setIsLoading(false);
            Alert.alert('Game updated successfully!');
            navigate();
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Failed to update game!');
        }
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
        isLoading
    }
}