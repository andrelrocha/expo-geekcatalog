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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        const endpoint = `/profilepic/user/${props.userId}`;

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                console.log(typeof response.data);
                /*
                if (response && response.data) {
                    const uri = { uri: `data:image/jpeg;base64,${response.data}` };
                    console.log(uri);
                    return uri;
                } else {
                    console.log('Resposta inválida ou imagem não encontrada');
                    return null;
                }
                */
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

        return response;

    } catch (error) {
        console.log('Erro no processo de buscar a imagem de perfil: ', error);
        return;
    }
};