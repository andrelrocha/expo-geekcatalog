import { getToken } from '../../../modules/auth.module';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const getImageGameGamesId = async () => {
   try {    
       const token = await getToken();

       const headers = {
           'Authorization': `Bearer ${token}`
       };

       const endpoint = `/imagegame/allgamesid`;

       const response = await ApiManager.get(endpoint, { headers })
           .then((response) => {
                if (response.data.content.length > 0) {
                    return response.data.content;
                } else {
                    throw new Error('No games id found for image game display');
                }
           })
           .catch((error) => {
               if (error.response) {
                   console.log('Error fetching games id for image game: ', error.response.data);
               } else {
                   console.log('Error fetching games id for image game: ', error);
               }
           });
       return response;
   }
   catch (error) {
       console.log('Error in the process of fetching games id for image game: ', error);
       return;
   }
};