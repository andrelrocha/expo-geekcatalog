export default interface ListCountReturn {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    userName: string;
    count: number;
    latestAdded?: string[];
}