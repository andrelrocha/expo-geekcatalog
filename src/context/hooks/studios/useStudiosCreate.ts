import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useCountriesDropdown from "../countries/useCountriesDropdown";
import StudioCreate from "../../../types/studio/studioCreateDTO";
import { createStudio } from "../../../services/studios/create";

export default function useStudiosCreate() {
    const { dropdownData: countryData } = useCountriesDropdown();    
    const[isLoading, setIsLoading] = useState(false);

    const createStudioContext = async (studioData: StudioCreate, navigate: () => void) => {
        setIsLoading(true);
        try {
            await createStudio(studioData);
            Alert.alert("Success", "Studio created successfully.");
        } catch (error) {
            Alert.alert("Error", "Error while creating a studio.");
        }
        setIsLoading(false);
        navigate();
    }

    return {
        isLoading,
        countryData,
        createStudioContext,
    }
}