import { ApiManager } from '../../../utils/API-axios/ApiManager';
import { getToken } from '../../../modules/auth.module';
import GameCommentReturn from '../../../types/gameComment/GameCommentReturnDTO';

export const getAllCommentsByGameId = async (gameId: string) => {
    try {
        const token = await getToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };  


        const endpoint = `/gamecomment/get/${gameId}`;
        const response = await ApiManager.get(endpoint, { headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });

        if (response.data) {
            const content = response.data.content;
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
            return comments;
        } else {
            throw new Error('Error mapping comments to DTO.');
        }
    } catch (error) {
        console.error('Error listing comments:', error);
        throw error;
    }
}