import { ApiManager } from "../../../utils/API-axios/ApiManager";

type HandleResetPasswordProps = {
    email: string;
    password: string;
    tokenMail: string;
};

export const resetPassword = async (props: HandleResetPasswordProps) => {
    try {
        const endpoint = "/user/reset_password";
        const data = {
            login: props.email,
            password: props.password,
            tokenMail: props.tokenMail,
        };

        const response = await ApiManager.post(endpoint, data)
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