import { UserLogin } from '../../../types/user/userLoginDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export async function loginUser(userData: UserLogin) {
  const endpoint = '/user/login';
  
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await ApiManager.post(endpoint, userData, { headers })
      .then((response) => {
        return response.data.token;
      })
      .catch((error) => {
        throw error;
      });
    
    return response;
  } catch (error) {
    console.error('Error while sign in a user:', error);
    throw error;
  }
}
