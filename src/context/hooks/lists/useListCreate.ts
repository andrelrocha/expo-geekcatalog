import { Alert } from "react-native";
import { useState } from "react";
import { createListGame } from "../../../services/listsApp/createList";
import { addBulkGameList } from "../../../services/gameList/addBulk";
import ListCreateDTO from "../../../types/listsApp/ListAppDTO";
import useAuth from "../use-auth.hook";
import useGamesDropdown from "../games/useGamesDropdown";


export default function useListCreate() {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const { dropdownData: gamesData } = useGamesDropdown();
    
    const createListMethod = async (data: ListCreateDTO, navigate: () => void, games: string[]) => {
        if (currentUser) {
            try {
                setIsLoading(true);
                const listResponse = await createListGame(data);

                if (listResponse?.id && games.length > 0) {
                    await addBulkGameList({
                        listId: listResponse?.id,
                        userId: currentUser.id,
                        gamesId: games
                    });
                }

                Alert.alert(`List ${listResponse?.name} created successfully!`);
                navigate();
            } catch (error: any) {
                console.error('Error fetching games:', error);
                Alert.alert('Error creating list!', error.response?.data || 'An error occurred while creating the list.');
            } finally{
                setIsLoading(false);
            }
        }
    }

    return { createListMethod, isLoading, gamesData };
}