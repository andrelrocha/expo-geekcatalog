export default interface GameFullInfoAdminDTO {
    name: string;
    metacritic: number;
    yearOfRelease: number;
    consoles: ConsoleInfo[];
    genres: GenreInfo[];
    studios: StudioInfo[];
}

interface ConsoleInfo {
    id: string;
    name: string;
}

interface GenreInfo {
    id: string;
    name: string;
}

interface StudioInfo {
    id: string;
    name: string;
}