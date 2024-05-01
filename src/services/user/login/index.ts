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
        console.error('Error logging in:', error.response.data);
        throw error;
      });
    
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
