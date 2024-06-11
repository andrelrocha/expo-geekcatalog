import { getToken } from "../../../modules/auth.module";
import { ApiManager } from "../../../utils/API-axios/ApiManager";

type UserDeleteProps = {
    userId: string;
};

export const deleteUser = async (props: UserDeleteProps) => {
    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const endpoint = "/user/delete"

    try {
        await ApiManager.delete(endpoint, { headers })
            .catch((error) => {
                throw error;
            });
    } catch (error: any) {
        console.error('Error while deleting a user:', error.response?.data);
        throw error;
    }
};