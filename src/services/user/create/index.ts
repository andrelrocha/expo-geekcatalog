import { UserCreate } from '../../../types/user/userCreateDTO';
import { UserReturn } from '../../../types/user/userReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const createUser = async (userData: UserCreate) => {
  const endpoint = '/user/create';

  const birthday = handleBirthdayInputChange(userData.birthday);
  const phone = handlePhoneInput(userData.phone);

  try {
    const response = await ApiManager.post(endpoint, userData)
      .then((response) => {
        if (response.data) {
          const userReturn: UserReturn = {
            birthday,
            cpf: response.data.cpf,
            id: response.data.id,
            login: response.data.login,
            name: response.data.name,
            phone,
            countryName: response.data.countryName,
          };

        return userReturn;
        }
      })
      .catch((error) => {
        console.log(error.response?.data);
        console.error('Erro ao criar usuário:', error);
        throw error;
      });

    return response;
  } catch (error: any) {
    console.log(error);
    console.error('Erro ao criar um usuário:', error.response?.data);
    throw error;
  }
};

const handleBirthdayInputChange = (birthday: string) => {
  const [day, month, year] = birthday.split('/');
  const parsedDate = new Date(`${year}-${month}-${day}`);
  const formattedDate = parsedDate.toISOString().substring(0, 10);
  return formattedDate;
};

const handlePhoneInput = (phoneNumber: string): string => {
  return phoneNumber.replace(/\s/g, "");
};