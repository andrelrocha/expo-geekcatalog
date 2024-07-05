import { useState } from "react";
import { searchByNameCompare } from "../../../services/games/searchByNameCompare";
import GameReturn from "../../../types/games/gameReturnDTO";
import { Alert } from "react-native";

export default function useSearchGames() {
    const [isLoading, setIsLoading] = useState(false);
    const [games, setGames] = useState<GameReturn[]>([]);

    const searchGames = async (nameComparable: string) => { 
        setIsLoading(true);
        try {
            const response = await searchByNameCompare({ nameComparable });
            setGames(response.content);
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to search game by name.";
            Alert.alert('Error', 'An error occurred while searching a game: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        searchGames,
        isLoading,
        games,
    }
}