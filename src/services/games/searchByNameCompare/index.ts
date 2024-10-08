import { getToken } from "../../../modules/auth.module";
import { ApiManager } from "../../../utils/API-axios/ApiManager";

type Props = {
    nameComparable: string;
}

export const searchByNameCompare = async ({ nameComparable }: Props) => {
    const token = await getToken();
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const formattedName = replaceSpacesAndSpecialCharacters(nameComparable);

    const endpoint = `/games/searchbyname/${formattedName}`;

    try {
        const response = await ApiManager.get(endpoint, { headers })
            .then(response => response)
            .catch(error => {
                throw error;
            });

        return response.data;
    } catch (error) {
        console.error('Error searching game by name:', error);
        throw error;
    }
}

const replaceSpacesAndSpecialCharacters = (str: string): string => {
    const stringWithUnderscores = str.replace(/\s+/g, '_');
    const stringWithSafeCharacters = stringWithUnderscores.replace(/'/g, '%27');
    return encodeURIComponent(stringWithSafeCharacters);
}