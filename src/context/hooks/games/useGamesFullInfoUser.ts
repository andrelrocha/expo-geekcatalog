import { useState } from "react";
import { listAllGameInfoByGameIDUser } from "../../../services/games/listAllInfoById";
import GameFullInfoUser from "../../../types/games/gameFullInfoUserDTO";

export const useGamesFullInfoUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [gameInfo, setGameInfo] = useState<GameFullInfoUser | null>(null);

    const loadGameInfoData = async (gameId: string) => {
        try {
            setIsLoading(true);
            const gameInfo = await listAllGameInfoByGameIDUser({gameId});
            setGameInfo(gameInfo);
            return gameInfo;
        } catch (error) {
            console.error('Error fetching full game info:', error);
        } finally {
            setIsLoading(false);
        }
    }  

    return { isLoading, gameInfo, loadGameInfoData };
}