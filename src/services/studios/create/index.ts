import { getToken } from '../../../modules/auth.module';
import StudioCreate from '../../../types/studio/studioCreateDTO';
import StudioReturn from '../../../types/studio/studioReturnDTO';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const createStudio = async (studioData: StudioCreate) => {
  const endpoint = '/studios/create';

  const token = await getToken();
  const headers = {
      'Authorization': `Bearer ${token}`
  };  

  try {
    const response = await ApiManager.post(endpoint, studioData, { headers })
      .then((response) => {
        if (response.data) {

          const studioReturn: StudioReturn = {
            id: response.data.id,
            name: response.data.name,
            countryName: response.data.countryName,
            countryId: response.data.countryId,
          };

        return studioReturn;
        }
      })
      .catch((error) => {
        console.log(error.response?.data);
        console.error('Error while creating a studio:', error);
        throw error.response?.data || error;
      });

      return response;
  } catch (error: any) {
    console.log(error);
    console.error('Error while creating a studio:', error);
    throw error;
  }
};