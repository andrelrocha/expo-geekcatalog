import { getToken } from '../../../modules/auth.module';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

type HandleSaveProfilePicProps = {
    uri: string;
    userId: any;
};
export const saveProfilePic = async (props: HandleSaveProfilePicProps) => {
    try {    
        const token = await getToken();
        
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        };
        
        const endpoint = `/profilepic/create/${props.userId}`;

        const formData = new FormData();

        formData.append('file', {
            uri: props.uri,
            type: 'image/jpeg',
            name: 'profilepic.jpg'
        });

        const response = await ApiManager.post(endpoint, formData, { headers })
            .then((response) => {
                if (response.data.id === props.userId) {
                    console.log('Image saved successfully');
                } else {
                    throw new Error('Error saving profile image');
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log('Error saving profile image: ', error.response.data);
                } else {
                    console.log('Error saving profile image: ', error);
                }
            });

        return response;
    }
    catch (error) {
        console.log('Error in the process of saving the profile image: ', error);
        return;
    }
};