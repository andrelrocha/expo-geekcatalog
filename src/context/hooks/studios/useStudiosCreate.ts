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
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to create studio.";
            Alert.alert('Error', 'An error occurred while creating a studio: ' + errorMessage);
        }  finally {
            setIsLoading(false);
        }
        navigate();
    }

    return {
        isLoading,
        countryData,
        createStudioContext,
    }
}