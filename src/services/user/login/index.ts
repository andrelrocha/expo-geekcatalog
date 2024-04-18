import { UserLogin } from '../../../types/user/userLoginDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';
import { Alert } from 'react-native';

export async function loginUser(userData: UserLogin) {
  try {
    const endpoint = '/user/login';

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await ApiManager.post(endpoint, userData, { headers })
      .then((response) => {
        return response.data.token;
      })
      .catch((error) => {
        console.log(error)
        console.error('Erro ao fazer login:', error.response.data);
        Alert.alert('Erro', 'Ocorreu um erro ao logar na sua conta: ' + error.response.data);
      });
    
    return response;
  } catch (error) {
    console.error(error);
  }
}
