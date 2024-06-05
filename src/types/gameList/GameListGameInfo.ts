import { NameAndIdDTO } from "../utils/nameAndIdDTO";

export default interface GameListGameInfoDTO {
    gameId: string;
    consolesAvailable: NameAndIdDTO[];
}