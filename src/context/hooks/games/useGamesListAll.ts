import { useState } from "react";
import { listAllGameInfoByGameIDUser } from "../../../services/games/listAllInfoById";
import useAuth from "../use-auth.hook";

const useGamesListAll = ({ }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [paginationInfo, setPaginationInfo] = useState({ totalPages: 0 });
    const [imageUris, setImageUris] = useState([]);

    const {authState} = useAuth();
    const {token} = authState;

    const loadGameInfoData = async (gameId: string) => {
        try {
            setIsLoading(true);
            const gameInfo = await listAllGameInfoByGameIDUser({gameId, token: token as string});
            setIsLoading(false);
            return gameInfo;
        } catch (error) {
            console.error('Error fetching full game info:', error);
        }
    }

    const loadImageUrlGames = async () => {
        try {
            //FAZER COM QUE RECUPERE OS IDS E URL DOS JOGOS COM IMG SALVAS
            //const gameIdsResponse = await getImageGameGamesId();
            //const gamesId = gameIdsResponse.map((gameId: any) => gameId.id);
            //return gamesId;
        } catch (error) {
            console.error('Error fetching game ids for image games:', error);
        }
    }
    
    /*
    const loadImageGamesUri = async (gameId: string) => {
        try {
            const image = await getImageGame({gameId});
            return image;
        } catch (error) {
            console.error('Error fetching image game:', error);
        }
    };

    const loadAllImageGamesUri = async () => {
        try {
            setIsLoading(true);
            const gamesId = await loadGameIdsForImageGames();
            const imageUris = await Promise.all(gamesId.map(loadImageGamesUri));
            const filteredImageUris = imageUris.filter(uri => uri !== undefined);
            const gamesWithImages = gamesId.reduce((acc: any, gameId: string, index: number) => {
                if (filteredImageUris[index]) {
                    acc.push({ id: gameId, uri: filteredImageUris[index] });
                }
                return acc;
            }, []);
            setIsLoading(false);
            return gamesWithImages;
        } catch (error) {
            console.error('Error fetching all image games URIs:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchGameIdsAndImages = async () => {
            const imageUris = await loadAllImageGamesUri();
            setImageUris(imageUris);
        };

        fetchGameIdsAndImages();
    }, []);
    */

    return { isLoading, paginationInfo, imageUris, loadGameInfoData };
};

export default useGamesListAll;
