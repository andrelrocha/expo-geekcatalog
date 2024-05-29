export default interface ListFullInfoReturn {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    count: number;
    latestUris?: string[];
}