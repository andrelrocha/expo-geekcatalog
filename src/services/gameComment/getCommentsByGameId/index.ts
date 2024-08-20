import { ApiManager } from '../../../utils/API-axios/ApiManager';
import { getToken } from '../../../modules/auth.module';
import GameCommentReturn from '../../../types/gameComment/GameCommentReturnDTO';
import PaginationQuery from '../../../types/utils/paginationQuery';
import PaginationInfo from '../../../types/utils/paginationInfo'; 

export const getAllCommentsByGameId = async (gameId: string, pagination: PaginationQuery) => {
    try {
        const { page, size, sortField, sortOrder } = pagination;

        const token = await getToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const endpoint = `/gamecomment/get/${gameId}?page=${page}&size=${size}&sortField=${sortField}&sortOrder=${sortOrder}`;
        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });

        if (response.data) {
            const { content, pageable, totalPages, totalElements, size: pageSize } = response.data;
            
            const comments: GameCommentReturn[] = content.map((comment: any) => {
                return {
                    id: comment.id,
                    userId: comment.userId,
                    username: comment.username,
                    rating: comment.rating,
                    gameId: comment.gameId,
                    comment: comment.comment,
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt,
                };
            });

            const paginationInfo: PaginationInfo = {
                totalPages: totalPages,
                currentPage: pageable.pageNumber,
                totalElements: totalElements,
                pageSize: pageSize,
            };

            return {
                comments,
                paginationInfo
            };
        } else {
            throw new Error('Error mapping comments to DTO.');
        }
    } catch (error) {
        console.error('Error listing comments:', error);
        throw error;
    }
}
