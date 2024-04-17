import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserLogin } from '../../../types/user/userLoginDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';
import { Alert } from 'react-native';

export async function loginUser(userData: UserLogin) {
  try {
    let status = false;

    const endpoint = '/user/login';

    const headers = {
      'Content-Type': 'application/json',
    };

    await ApiManager.post(endpoint, userData, { headers })
      .then((response) => {
        AsyncStorage.setItem('auth', response.data.token);
        status = true;
      })
      .catch((error) => {
        console.log(error)
        console.error('Erro ao fazer login:', error.response.data);
        Alert.alert('Erro', 'Ocorreu um erro ao logar na sua conta: ' + error.response.data);
      });
    
    return status;
  } catch (error) {
    console.error(error);
  }
}
