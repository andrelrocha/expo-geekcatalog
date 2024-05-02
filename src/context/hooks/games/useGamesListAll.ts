import { useEffect, useState } from "react";
import { listAllGames } from "../../../services/games/listAll";
import GameReturn from "../../../types/games/gameReturnDTO";

export default function useGamesListAll(): GameReturn[] {
    const [games, setGames] = useState<GameReturn[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const gamesData = await listAllGames('');
                setGames(gamesData);
            } catch (error) {
                console.error('Erro ao buscar jogos:', error);
            }
        };

        fetchGames();
    }, []);

    return games;
}