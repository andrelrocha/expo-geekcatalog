import { UserCreate } from '../../../types/user/userCreateDTO';
import { UserReturn } from '../../../types/user/userReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const createUser = async (userData: UserCreate) => {
  const endpoint = '/user/create';

  try {
    const response = await ApiManager.post(endpoint, userData)
      .then((response) => {
        if (response.data) {
          const phone = response.data.phone.replace(/\D/g, '');
          const birthdayResponse = response.data.birthday.split('-').reverse().join('/')

          const userReturn: UserReturn = {
            cpf: response.data.cpf,
            id: response.data.id,
            login: response.data.login,
            name: response.data.name,
            birthday: birthdayResponse,
            phone: phone,
            countryName: response.data.countryName,
            countryId: response.data.countryId,
            role: response.data.role,
          };

        return userReturn;
        }
      })
      .catch((error) => {
        console.log(error.response?.data);
        console.error('Error while creating a user:', error.response?.data);
        throw error;
      });

    return response;
  } catch (error: any) {
    console.log(error);
    console.error('Error while creating a user:', error);
    throw error;
  }
};