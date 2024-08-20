import { ApiManager } from '../../../utils/API-axios/ApiManager';
import { getToken } from '../../../modules/auth.module';
import { UserPublicInfo } from '../../../types/user/userPublicInfoDTO';

export const getPublicInfoByUserId = async (userId: string) => {
    try {
        const token = await getToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const endpoint = `/user/public/${userId}`;

        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });

        if (response.data) {
            const content = response.data;
            const userPublicInfo: UserPublicInfo = {
                name: content.name,
                birthday: content.birthday,
                countryName: content.countryName,
                countryId: content.countryId,
            };

            return userPublicInfo;
        }
    } catch (error) {
        console.error('Error listing public user info:', error);
        throw error;
    }
}
