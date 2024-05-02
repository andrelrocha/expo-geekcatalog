import { ApiManager } from "../../../utils/API-axios/ApiManager";

export async function forgotPassword(email: string) {
    try {
        const endpoint = '/user/forgot_password';
        const data = { login: email };

        const response = await ApiManager.post(endpoint, data)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('Error sending email:', error.response.data);
                throw new Error('Error sending email: ' + error.response.data);
            });

        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error sending email: ' + error);
    }
}