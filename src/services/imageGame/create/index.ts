import { getToken } from '../../../modules/auth.module';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

type HandleSaveImageGameProps = {
   uri: string;
   gameId: any;
};
export const saveImageGame = async (props: HandleSaveImageGameProps) => {
   try {    
       const token = await getToken();

       const headers = {
           'Content-Type': 'multipart/form-data',
           'Authorization': `Bearer ${token}`
       };

       const endpoint = `/imagegame/create/${props.gameId}`;

       const formData = new FormData();
       formData.append('file', {
           uri: props.uri,
           type: 'image/jpeg',
           name: 'imagegame.jpg'
       });

       const response = await ApiManager.post(endpoint, formData, { headers })
           .then((response) => {
               if (response.data.gameId === props.gameId) { 
                   console.log('Image saved successfully');
               } else {
                   throw new Error('Error saving image game');
               }
           })
           .catch((error) => {
               if (error.response) {
                   console.log('Error saving image game: ', error.response.data);
               } else {
                   console.log('Error saving image game: ', error);
               }
           });
       return response;
   }
   catch (error) {
       console.log('Error in the process of saving the image game: ', error);
       return;
   }
};