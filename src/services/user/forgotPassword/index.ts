import { ApiManager } from "../../../utils/API-axios/ApiManager";

type HandleForgotPasswordProps = {
    email: string;
};

export async function forgotPassword(props: HandleForgotPasswordProps) {
    try {
        const endpoint = '/user/forgot_password';
        const data = { login: props };

        const response = await ApiManager.post(endpoint, data)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('Error sending email during password recovery:', error.response.data);
                throw new Error('Error sending email during password recovery: ' + error.response.data);
            });

        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error sending email: ' + error);
    }
}