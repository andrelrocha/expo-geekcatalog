export default interface PaginationQuery {
    page: number;
    size: number;
    sortField: string;
    sortOrder: 'asc' | 'desc';
}