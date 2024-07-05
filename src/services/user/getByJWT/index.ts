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
                throw error;
            });

            const phone = response.phone.replace(/\D/g, '');
            const birthday = response.birthday.split('-').reverse().join('/')

            const user: UserReturn = {
                id: response.id,
                login: response.login,
                name: response.name,
                cpf: response.cpf,
                phone: phone,
                birthday: birthday,
                countryName: response.countryName,
                countryId: response.countryId,
                role: response.role,
            };

        return user;
    } catch (error) {
        console.error('Error while getting a user by its JWT:', error);
        throw error;
    }
}