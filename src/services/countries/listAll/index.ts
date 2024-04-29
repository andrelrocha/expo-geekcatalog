import { ApiManager } from '../../../utils/API-axios/ApiManager';
import CountryReturn from '../../../types/countries/countryReturnDTO';

export const listAllCountries = async () => {
    try {
        const endpoint = "/countries/getall";
        const response = await ApiManager.get(endpoint)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Erro ao listar os países:', error);
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
            const countries: CountryReturn[] = content.map((country: any) => {
                return {
                    id: country.id,
                    name: country.name,
                    code: country.code,
                };
            });
            return countries;
        } else {
            throw new Error('Erro ao listar países: ' + response.status);
        }
    } catch (error) {
        console.error('Erro ao listar países:', error);
        throw error;
    }
}