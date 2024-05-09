import { getToken } from '../../../modules/auth.module';
import { ApiManager, ApiManagerMultiPart } from '../../../utils/API-axios/ApiManager';


type HandleGetProfilePicProps = {
    userId: string;
};

export const getProfilePic = async (props: HandleGetProfilePicProps) => {
    try {
        const token = await getToken();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        };  
        const endpoint = `/profilepic/user/${props.userId}`;

        const response = await ApiManagerMultiPart.get(endpoint, { headers })
            .then((response) => {
                if (response.status === 200 && response.data) {
                    const blob = new Blob([response.data]);
                    return URL.createObjectURL(blob);
                } else {
                    console.log('Error fetching profile image: No data returned');
                }
            })
            .catch((error) => {
                console.log('Error fetching profile image: ', error);
            });

        return response;
    } catch (error) {
        console.log('Error in the process of fetching the profile image: ', error);
        return null;
    }
};