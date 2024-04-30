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
                    console.log('Imagem salva com sucesso');
                } else {
                    throw new Error('Erro ao salvar a imagem de perfil');
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log('Erro ao salvar a imagem de perfil: ', error.response.data);
                } else {
                    console.log('Erro ao salvar a imagem de perfil: ', error);
                }
            });

        return response;
    }
    catch (error) {
        console.log('Erro no processo de salvar a imagem de perfil: ', error);
        return;
    }
};