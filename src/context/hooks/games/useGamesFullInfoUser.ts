import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listAllGameInfoByGameIDUser } from "../../../services/games/listAllInfoById";
import { addGameRating } from "../../../services/gameRating/add";
import { addGameComment } from "../../../services/gameComment/addComment";
import { getUserRatingByGame } from "../../../services/gameRating/getByUserAndGame";
import { getAllCommentsByGameId } from "../../../services/gameComment/getCommentsByGameId";
import GameCommentReturn from "../../../types/gameComment/GameCommentReturnDTO";
import GameFullInfoUser from "../../../types/games/gameFullInfoUserDTO";
import AddGameRatingDTO from "../../../types/gameRating/AddGameRating";
import AddGameCommentDTO from "../../../types/gameComment/AddGameCommentDTO";
import PaginationQuery from "../../../types/utils/paginationQuery";
import PaginationInfo from "../../../types/utils/paginationInfo";

export const useGamesFullInfoUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [gameInfo, setGameInfo] = useState<GameFullInfoUser | null>(null);
    const [modalRatingVisible, setModalRatingVisible] = useState(false);
    const [modalReviewVisible, setModalReviewVisible] = useState(false);
    const [gameRating, setGameRating] = useState(0);
    const [userRatingAdded, setUserRatingAdded] = useState(false);
    const [userCommentAdded, setUserCommentAdded] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [comments, setComments] = useState<GameCommentReturn[]>([]);
    const [commentsPagination, setCommentsPagination] = useState<PaginationQuery>({ page: 0, size: 5, sortField: 'createdAt', sortOrder: 'desc' });
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);
    const [allCommentsLoaded, setAllCommentsLoaded] = useState(false);

    const loadGameInfoData = async (gameId: string) => {
        try {
            setIsLoading(true);
            const gameInfo = await listAllGameInfoByGameIDUser({gameId});
            setGameInfo(gameInfo);
            return gameInfo;
        } catch (error: any) {
            const erorrMessage = error.response?.data || error.message || "Failed to load game info.";
            Alert.alert('Error', 'An error occurred while loading game info: ' + erorrMessage);
        } finally {
            setIsLoading(false);
        }
    }  

    const loadComments = async (gameId: string, paginationParams: PaginationQuery) => {
        try {
            setIsCommentsLoading(true);
            const { comments, paginationInfo } = await getAllCommentsByGameId(gameId, paginationParams);
            setComments(comments);
            setPaginationInfo(paginationInfo);
            return comments;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to load comments.";
            Alert.alert('Error', 'An error occurred while loading comments: ' + errorMessage);
        } finally {
            setIsCommentsLoading(false);
        }
    }

    const addGameRatingMethod = async (data: AddGameRatingDTO) => {
        try {
            setIsLoading(true);
            const gameRating = await addGameRating(data);
            Alert.alert('Rating added successfully');
            setUserRatingAdded(true);
            return gameRating;
        } catch (error: any) {
            const erorrMessage = error.response?.data || error.message || "Failed to add rating.";
            Alert.alert('Error', 'An error occurred while adding rating: ' + erorrMessage);
        } finally {
            setIsLoading(false);
            setUserRatingAdded(false);
        }
    }

    const addGameCommentMethod = async (data: AddGameCommentDTO) => {
        try {
            setIsLoading(true);
            const gameComment = await addGameComment(data);
            Alert.alert('Comment added successfully');
            setUserCommentAdded(true);
            return gameComment;
        } catch (error: any) {
            const erorrMessage = error.response?.data || error.message || "Failed to add comment.";
            Alert.alert('Error', 'An error occurred while adding comment: ' + erorrMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const getUserRating = async (gameId: string) => {
        try {
            setIsLoading(true);
            const userRating = await getUserRatingByGame({gameId});
            setUserRating(userRating.rating);
            return userRating;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to get user rating.";
            Alert.alert('Error', 'An error occurred while getting user rating: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchUserRating = async () => {
            if (modalRatingVisible) {
                const rating = await getUserRating(gameInfo?.id as string);
                if (rating) {
                    setGameRating(rating.rating / 2);
                }
            }
        }
        fetchUserRating();
    }, [modalRatingVisible, gameInfo]);


    return { isLoading, gameInfo, loadGameInfoData, modalRatingVisible, setModalRatingVisible, modalReviewVisible, setModalReviewVisible, addGameCommentMethod,
        gameRating, setGameRating, addGameRatingMethod, userRatingAdded, userRating, comments, paginationInfo, setAllCommentsLoaded, allCommentsLoaded,
        loadComments, userCommentAdded, commentsPagination, setCommentsPagination, isCommentsLoading };
}