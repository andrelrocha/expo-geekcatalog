export default interface ListReturn {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    userName: string;
    count: number;
    latestUris?: string[];
}