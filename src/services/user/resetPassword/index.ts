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
                console.error("Error resetting password:", error.response.data);
                throw new Error("Error resetting password: " + error.response.data);
            });

        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Error resetting password: " + error);
    }
}