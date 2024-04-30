import { Platform } from 'react-native';
import { getToken } from '../../../modules/auth.module';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

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
                    return url;
                } else {
                    console.log('Resposta inválida ou imagem não encontrada');
                    return null;
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        console.log("Erro ao buscar a imagem de perfil: Token inválido ou expirado");
                    } else {
                        console.log('Erro ao buscar a imagem de perfil: ', error.response.data);
                    }
                } else {
                    console.log('Erro ao buscar a imagem de perfil: ', error);
                }
            });

            console.log('response', response);

        return response;

    } catch (error) {
        console.log('Erro no processo de buscar a imagem de perfil: ', error);
        return;
    }
};