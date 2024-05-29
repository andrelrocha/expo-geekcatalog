export default interface GameListDTO {
    id: string;
    userId?: string;
    gameId: string;
    gameName: string;
    consoleId: string;
    consolePlayed: string;
    uri: string;
}