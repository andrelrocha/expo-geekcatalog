export default interface GameCreate {
    name: string,
    metacritic: number,
    yearOfRelease: number,
    consoles: string[],
    genres: string[],
    studios: string[],
    uri: string,
}