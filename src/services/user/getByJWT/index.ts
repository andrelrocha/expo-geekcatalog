import { Alert } from "react-native";
import { ApiManager } from "../../../utils/API-axios/ApiManager";
import { UserReturn } from "../../../types/user/userReturnDTO";

export async function getUserByJWT(tokenJWT: string) {
    try {
        const endpoint = '/user/bytokenjwt';
        const headers = {
            'Authorization': `Bearer ${tokenJWT}`
        };

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
                console.error('Erro ao buscar usuário:', error.response.data);
                Alert.alert('Erro', 'Ocorreu um erro ao buscar suas informações: ' + error.response.data);
            });

            const user: UserReturn = {
                id: response.id,
                login: response.login,
                name: response.name,
                cpf: response.cpf,
                phone: response.phone,
                birthday: response.birthday
            };

        return user;
    } catch (error) {
        console.error(error);
    }
}