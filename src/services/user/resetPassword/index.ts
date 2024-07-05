import { ApiManager } from "../../../utils/API-axios/ApiManager";

type HandleResetPasswordProps = {
    login: string;
    password: string;
    tokenMail: string;
};

export const resetPassword = async (resetPasswordData: HandleResetPasswordProps) => {
    try {
        const endpoint = "/user/reset_password";

        const response = await ApiManager.post(endpoint, resetPasswordData)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });

        return response;
    } catch (error) {
        console.error("Error while trying to reset the password: ", error);
        throw error;
    }
}