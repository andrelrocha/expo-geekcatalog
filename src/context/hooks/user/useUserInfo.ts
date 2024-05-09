import { useState } from "react";
import useCountriesDropdown from "../countries/useCountriesDropdown";
import { handleImageSelection } from "../../../services/image/getImageFromUser";

export default function useUserInfo() {
    const { dropdownData } = useCountriesDropdown();    
    const [editEnabled, setEditEnabled] = useState(false);
    const [modalPicVisible, setModalPicVisible] = useState(false);
    const [uri, setUri] = useState("");
    const handleProfilePicture = async (mode: "gallery" | "camera" | undefined) => {
        const uri = await handleImageSelection({ mode: mode });
        setUri(uri as string);
    }

    return {
        dropdownData,
        editEnabled,
        setEditEnabled,
        modalPicVisible,
        setModalPicVisible,
        uri,
        setUri,
        handleProfilePicture
    };
}