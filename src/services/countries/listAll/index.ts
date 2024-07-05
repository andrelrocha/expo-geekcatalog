import { ApiManager } from '../../../utils/API-axios/ApiManager';
import CountryReturn from '../../../types/countries/countryReturnDTO';

export const listAllCountries = async () => {
    try {
        const endpoint = "/countries/all";
        const response = await ApiManager.get(endpoint)
            .then((response) => {
                return response;
            })
            .catch((error) => {
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
            throw new Error('Error mapping countries to DTO.');
        }
    } catch (error) {
        console.error('Error listing countries:', error);
        throw error;
    }
}