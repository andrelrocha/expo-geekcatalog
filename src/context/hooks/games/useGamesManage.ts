import { useState } from "react";
import useConsolesDropdown from "../consoles/useConsolesDropdown";
import useGenresDropdown from "../genres/useGenresDropdown";
import useStudiosDropdown from "../studios/useStudiosDropdown";

export default function useGamesManage() {
    const [editEnabled, setEditEnabled] = useState(false);

    const { dropdownData: consolesData } = useConsolesDropdown();
    const { dropdownData: genresData } = useGenresDropdown();
    const { dropdownData: studiosData } = useStudiosDropdown();

    return {
        consolesData,
        genresData,
        studiosData,
        editEnabled,
        setEditEnabled,
    }
}