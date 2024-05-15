import { NameAndIdDTO } from "../utils/nameAndIdDTO";

export default interface GameFullInfoAdminDTO {
    id?: string
    name: string;
    metacritic: number;
    yearOfRelease: number;
    consoles: NameAndIdDTO[];
    genres: NameAndIdDTO[];
    studios: NameAndIdDTO[];
}