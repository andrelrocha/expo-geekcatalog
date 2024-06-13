import { useState } from "react";
import { searchByNameCompare } from "../../../services/games/searchByNameCompare";
import GameReturn from "../../../types/games/gameReturnDTO";

export default function useSearchGames() {
    const [isLoading, setIsLoading] = useState(false);
    const [games, setGames] = useState<GameReturn[]>([]);

    const searchGames = async (nameComparable: string) => {
        setIsLoading(true);
        try {
            const response = await searchByNameCompare({ nameComparable });
            setGames(response.content);
        } catch (error) {
            console.error(error);
            throw new Error('Error searching game by name');
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