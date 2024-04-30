import { getToken } from '../../../modules/auth.module';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

type HandleGetProfilePicProps = {
    userId: string;
};

export const getProfilePic = async (props: HandleGetProfilePicProps) => {
    try {
        const token = await getToken();
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        const endpoint = `/profilepic/user/${props.userId}`;

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                if (response.data) {
                    const imageURI = URL.createObjectURL(new Blob([response.data]));
                    return imageURI;
                } else {
                    console.log('Erro: Resposta da API não contém dados da imagem.');
                    return null;
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log('Erro ao buscar a imagem de perfil: ', error.response.data);
                } else {
                    console.log('Erro ao buscar a imagem de perfil: ', error);
                }
            });

        return response;

    } catch (error) {
        console.log('Erro no processo de buscar a imagem de perfil: ', error);
        return;
    }
};