import { Alert } from "react-native";
import { useState } from "react";
import { createListGame } from "../../../services/listsApp/createList";
import ListCreateDTO from "../../../types/listsApp/listCreateDTO";
import useAuth from "../use-auth.hook";


export default function useListCreate() {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    
    const createList = async (data: ListCreateDTO, navigate: () => void) => {
        if (currentUser) {
            setIsLoading(true);
            try {
                const listResponse = await createListGame(data);
                setIsLoading(false);
                Alert.alert(`List ${listResponse?.name} created successfully!`);
                navigate();
            } catch (error) {
                console.error('Error fetching games:', error);
                setIsLoading(false);
                Alert.alert('Error creating list!');
            }
        }
    }

    return { createList, isLoading };
}