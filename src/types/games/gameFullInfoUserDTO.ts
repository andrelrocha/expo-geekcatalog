export default interface GameFullInfoUser {
    id: string;
    name: string;
    metacritic: number;
    yearOfRelease: number;
    studios: string[];
    genres: string[];
    consoles: string[];
    imageUrl: string;
}