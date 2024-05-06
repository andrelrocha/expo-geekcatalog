import { useEffect, useState } from "react";
import { listAllGames } from "../../../services/games/listAll";
import GameReturn from "../../../types/games/gameReturnDTO";
import useAuth from "../use-auth.hook";



export default function useGamesListAll(){
    const [games, setGames] = useState<GameReturn[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { authState } = useAuth();
    const { token } = authState;

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setIsLoading(true);
                const params ={
                    token: token as string,
                    params: 'size=100'
                }
                const gamesData = await listAllGames(params);
                setGames(gamesData);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar jogos:', error);
            }
        };

        fetchGames();
    }, []);

    return {games, isLoading};
}