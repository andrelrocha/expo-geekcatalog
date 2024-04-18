import { ApiManager } from "../../../utils/API-axios/ApiManager";

export const verifyJWT = async (token: string) => {
    const response = await ApiManager.get('/infra/verifyjwt/'+token)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
    
    return response;
    }