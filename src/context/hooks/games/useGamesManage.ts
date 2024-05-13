import { useState } from "react";
import useConsolesDropdown from "../consoles/useConsolesDropdown";
import useGenresDropdown from "../genres/useGenresDropdown";
import useStudiosDropdown from "../studios/useStudiosDropdown";
import { listAllGameInfoByGameIDAdmin } from "../../../services/games/listAllInfoAdminById";
import useAuth from "../use-auth.hook";

export default function useGamesManage() {
    const [editEnabled, setEditEnabled] = useState(false);
    const [ valueSelectedConsole, setValueSelectedConsole ] = useState<string[]>([]);
    const [ valueSelectedGenre, setValueSelectedGenre ] = useState<string[]>([]);
    const [ valueSelectedStudio, setValueSelectedStudio ] = useState<string[]>([]);

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
        setValueSelectedStudio
    }
}