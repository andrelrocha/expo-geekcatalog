export default interface ListsGameReturn {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    userName: string;
    latestGamesOnListID: Array<string>;
}