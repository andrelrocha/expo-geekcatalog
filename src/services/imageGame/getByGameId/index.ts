import { getToken } from '../../../modules/auth.module';
import { ApiManagerMultiPart } from '../../../utils/API-axios/ApiManager';


type HandleGetImageGame = {
    gameId: string;
};

export const getImageGame = async (props: HandleGetImageGame) => {
    try {
        const token = await getToken();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        };  
        const endpoint = `/imagegame/game/${props.gameId}`;

        const response = await ApiManagerMultiPart.get(endpoint, { headers })
            .then((response) => {
                if (response.status === 200 && response.data) {
                    console.log('Image game fetched successfully');
                    const blob = new Blob([response.data]);
                    return URL.createObjectURL(blob);
                } else {
                    console.log('Error fetching image game: No data returned');
                }
            })
            .catch((error) => {
                console.log('Error fetching image game: ', error);
                console.log('Error fetching image game for gameId: ', props.gameId);
            });

        return response;
    } catch (error) {
        console.log('Error in the process of fetching the image game ', error);
        return null;
    }
};