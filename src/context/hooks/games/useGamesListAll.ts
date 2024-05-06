import { useEffect, useState } from "react";
import { listAllGames } from "../../../services/games/listAll";
import GameReturn from "../../../types/games/gameReturnDTO";
import useAuth from "../use-auth.hook";

export default function useGamesListAll(): GameReturn[] {
    const [games, setGames] = useState<GameReturn[]>([]);
    const { authState } = useAuth();
    const { token } = authState;

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const params ={
                    token: token as string,
                    params: 'size=100'
                }
                const now = new Date();
                console.log('list all games called at:' , now);
                const gamesData = await listAllGames(params);
                setGames(gamesData);
            
            } catch (error) {
                console.error('Erro ao buscar jogos:', error);
            }
        };

        fetchGames();
    }, []);

    return games;
}