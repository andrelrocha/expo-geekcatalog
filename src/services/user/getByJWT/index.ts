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
                console.error('Error fetching user:', error.response.data);
                throw new Error('Error fetching user: ' + error.response.data);
            });

            const phone = response.phone.substring(0, 4) + " " + response.phone.substring(4);
            const birthday = response.birthday.split('-').reverse().join('/')

            const user: UserReturn = {
                id: response.id,
                login: response.login,
                name: response.name,
                cpf: response.cpf,
                phone: phone,
                birthday: birthday,
                countryName: response.countryName,
                countryId: response.countryId
            };

        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching user: ' + error);
    }
}