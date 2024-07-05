import { getToken } from '../../../modules/auth.module';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

type HandleUploadImageGameProps = {
   uri: string;
   gameId: any;
};
export const uploadImageGame = async (props: HandleUploadImageGameProps) => {
   try {    
       const token = await getToken();

       const headers = {
           'Content-Type': 'multipart/form-data',
           'Authorization': `Bearer ${token}`
       };

       const endpoint = `/imagegame/upload/${props.gameId}`;

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
                   throw new Error('Error uploading image game');
               }
           })
           .catch((error) => {
               throw error;
           });
       return response;
   }
   catch (error) {
       console.log('Error in the process of uploading the image game: ', error);
       throw error;
   }
};