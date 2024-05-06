import { getToken } from '../../../modules/auth.module';
import { ApiManager } from '../../../utils/API-axios/ApiManager';
import * as FileSystem from 'expo-file-system'; 


type HandleGetProfilePicProps = {
    userId: string;
};

export const getProfilePic = async (props: HandleGetProfilePicProps) => {
    try {
        console.log("getProfilePic")

        const token = await getToken();
        
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        };

        const endpoint = `/profilepic/user/${props.userId}`;

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                if (response && response.data) {
                    const blob = new Blob([response.data]);
                    const url = URL.createObjectURL(blob);
                    const localUri = `${FileSystem.cacheDirectory}profile_pic.jpg`;
                    return { url, localUri }
                    /*await FileSystem.writeAsStringAsync(localUri, url, { encoding: FileSystem.EncodingType.Base64 });
                    console.log(url)
                    return url;*/
                } else {
                    console.log('Invalid response or image not found');
                    return null;
                }
            })
            .then(async (response) => {
                if (response) {
                    await FileSystem.writeAsStringAsync(response.localUri, response.url, { encoding: FileSystem.EncodingType.Base64 });
                    return response;
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        console.log("Error fetching profile image: Invalid or expired token");
                    } else {
                        console.log('Error fetching profile image: ', error.response.data);
                    }
                } else {
                    console.log('Error fetching profile image: ', error);
                }
            });

        return response;

    } catch (error) {
        console.log('Error in the process of fetching the profile image: ', error);
        return;
    }
};
