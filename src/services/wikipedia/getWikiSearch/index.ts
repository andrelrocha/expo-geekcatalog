import { ApiManager } from "../../../utils/API-axios/ApiManager";

interface WikipediaCustomResponse {
    pageId: string;
    title: string;
    extract: string;
}

interface WikipediaSearchParams {
    titles: string;
}

const capitalizeWords = (str: string) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (letter) {
        return letter.toUpperCase();
    });
};

export const searchWikipedia = async (params: WikipediaSearchParams): Promise<WikipediaCustomResponse> => {
    const capitalizedTitle = capitalizeWords(params.titles);
    const apiUrl = 'https://en.wikipedia.org/w/api.php';

    try {
        const response = await ApiManager.get(apiUrl, {
            params: {
                action: 'query',
                format: 'json',
                prop: 'extracts',
                exintro: true,
                explaintext: true,
                titles: capitalizedTitle,
                origin: '*'
            }
        });

        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];

        if (pageId) {
            const page = pages[pageId];
            const title = page.title;
            const extract = page.extract;

            return { pageId, title, extract };
        } else {
            throw new Error('No page found in response');
        }
    } catch (error) {
        console.error('Failed to fetch data from Wikipedia API', error);
        throw new Error('Failed to fetch data from Wikipedia API');
    }
}



//super buggy, decided to not fully implement it 


/*   CONTEXT
    const getWikiExtract = async (gameName: string) => {
        try {
            setIsLoading(true);
            const response = await searchWikipedia({ titles: gameName });
            if (response.extract) {
                setWikiExtract(response.extract);
            } else {
                setWikiExtract('No information found');
            }
        } catch (error) {
            console.error('Error fetching Wikipedia extract:', error);
        } finally {
            setIsLoading(false);
        }
    }
    */