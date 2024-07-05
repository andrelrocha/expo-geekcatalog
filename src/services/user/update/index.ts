import { ApiManager } from "../../../utils/API-axios/ApiManager";
import { UserReturn } from "../../../types/user/userReturnDTO";
import { getToken } from "../../../modules/auth.module";
import { UserUpdate } from "../../../types/user/userUpdateDTO";

export async function updateUserInfo(userData: UserUpdate) {
    try {
        const endpoint = '/user/update';

        const token = await getToken();

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const response = await ApiManager.put(endpoint, userData, { headers })
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
        console.error("Caught error while updating a user:", error);
        throw error;
    }
}
