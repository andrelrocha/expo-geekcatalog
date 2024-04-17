import { UserCreate } from '../../../types/user/userCreateDTO';
import { UserReturn } from '../../../types/user/userReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';
import { loginUser } from '../login';

export const createUser = async (userData: UserCreate) => {
  const endpoint = '/user/create';

  try {
    const response = await ApiManager.post(endpoint, userData)
      .then((response) => {
        if (response.data) {
          const userReturn: UserReturn = {
            birthday: response.data.birthday,
            cpf: response.data.cpf,
            id: response.data.id,
            login: response.data.login,
            name: response.data.name,
            phone: response.data.phone,
          };

          try {
            const loginData = {
              login: userData.login,
              password: userData.password,
            };
  
            loginUser(loginData);
          } catch (error: any) {
            console.error('Erro ao logar o usuário após criação:', error.response?.data);
            throw error;
          }
  
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