export default interface UpdateGameFullInfoAdminDTO {
    id?: string
    name: string;
    metacritic: number;
    yearOfRelease: number;
    consoles: string[];
    genres: string[];
    studios: string[];
}