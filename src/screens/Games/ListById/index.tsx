import React, { useEffect } from "react";
import { ParamListBase } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import PageDefault from "../../Default";
import { useGamesFullInfoUser } from "../../../context/hooks/games/useGamesFullInfoUser";
import { AppStarRating, Box, ButtonTouchable, Heading, ImageTouchable, CommentBox, Modal, TextWarning, InputWithLabel, InputText } from "../../../components";
import { colors } from "../../../utils/colors";
import { useAuth } from "../../../context/hooks";
import { EllipsisIcon } from "../../../components/icons";

type GameByIdParams = {
    gameId: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'ListGameById'>;

const DEFAULT_FORM_VALUES = {
    comment: '',
};
  
type FormData = {
    comment: string;
}

export default function ListGameById({ navigation, route }: Props) {
    const { gameId } = route.params as GameByIdParams;
    const { currentUser } = useAuth();

    const {
        control,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"});

    const { isLoading, gameInfo, loadGameInfoData, modalRatingVisible, setModalRatingVisible, gameRating, setGameRating,  modalReviewVisible, setModalReviewVisible,
        addGameRatingMethod, userCommentAdded, userRatingAdded, userRating, loadComments, comments, addGameCommentMethod, commentsPagination, setCommentsPagination,
        isCommentsLoading, paginationInfo, allCommentsLoaded, setAllCommentsLoaded
    } = useGamesFullInfoUser();

    useEffect(() => {
        loadGameInfoData(gameId);
        loadComments(gameId, commentsPagination);
    }, [userRatingAdded, gameId]);

    useEffect(() => {
        loadComments(gameId, commentsPagination);
    }, [userCommentAdded, commentsPagination]);

    const modalAddRating = () => {
        return (
            <View style={styles.modalContainer}> 
                <Heading textAlign="left" mb={10} fs={20}>{(gameInfo?.name || 'Game') + ":"}</Heading>
                <AppStarRating
                    initialRating={userRating || 0}
                    maxStars={5}
                    starSize={40}
                    color={colors.buttonBlue}
                    emptyColor={colors.grayOpacity}
                    interactive={true}
                    rating={gameRating}
                    onChange={setGameRating}
                    style={{alignSelf: 'center'}}
                />

                <ButtonTouchable onPress={handleRatingSubmit} style={styles.submitButton}>
                    Submit
                </ButtonTouchable>
            </View>
        )
    }

    const modalAddComment = () => {
        return (
            <View style={styles.modalContainer}> 
                <Heading textAlign="center" mb={10} fs={20}>{(gameInfo?.name || 'Game')}</Heading>

                <InputWithLabel label="Comment">
                    <InputText control={control} name="comment" numberOfLines={4}
                                placeholder="Your comments about the game" icon={0}/>
                </InputWithLabel>

                <ButtonTouchable onPress={() => handleSubmit(handleReviewSubmit)()} style={styles.submitButton}>
                    Submit
                </ButtonTouchable>
            </View>
        )
    } 

    const handleRatingSubmit = async () => {
        const apiRating = gameRating * 2;
        const data = {
            gameId: gameId,
            rating: apiRating,
            userId: currentUser?.id as string,
        }
        await addGameRatingMethod(data);
        setModalRatingVisible(false);
    }

    const handleReviewSubmit = async (data: FormData) => {
        const gameCommentAdded = await addGameCommentMethod({
            gameId: gameId,
            comment: data.comment,
        });
        reset(DEFAULT_FORM_VALUES);
        setModalReviewVisible(false);
    }

    const handleIncreaseSize = () => {
        setCommentsPagination((prev) => {
            if (!paginationInfo) {
                return prev;
            }
    
            const newSize = prev.size + 5;
            
            if (newSize > paginationInfo.totalElements) {
                setAllCommentsLoaded(true);
                return {
                    ...prev,
                    size: paginationInfo.totalElements
                };
            }
    
            return {
                ...prev,
                size: newSize
            };
        });
    };

    return (
        <>
        <PageDefault>
            {isLoading ? (
                <TextWarning mt={50} w={300} fs={20} h={40} fw="bold">Loading...</TextWarning>
            ) : (
                <>
                    <Heading w={280} mt={5} mb={10} fs={28}>{gameInfo?.name || 'Game'}</Heading>
                    <ImageTouchable w={280} h={280} mb={5} key={gameInfo?.id} source={{uri: gameInfo?.imageUrl}} alt="Image Game" br={10}/>
                    <Box w={280} mt={5} mb={15} alignItems="flex-start">
                    {gameInfo && gameInfo.totalReviews > 0 ? (
                        <>
                            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                                <ButtonTouchable onPress={() => setModalRatingVisible(true)} style={styles.addRatingButton}>
                                    Add Rating
                                </ButtonTouchable>
                                <AppStarRating
                                    initialRating={gameInfo?.averageRating || 0}
                                    rating={gameInfo?.averageRating || 0}
                                    onChange={setGameRating}
                                    maxStars={5}
                                    starSize={25}
                                    color={colors.buttonBlue}
                                    emptyColor={colors.grayOpacity}
                                    interactive={false}
                                    style={styles.starsRatingStatic}
                                />
                            </Box>
                            <Text style={styles.titleTextModalInfo}>
                                Avg. Rating: <Text style={styles.textModalInfo}>{gameInfo?.averageRating}</Text> 
                            </Text>
                        </>
                    ) : (
                        <Box alignItems="center" mb={5}>
                            <ButtonTouchable onPress={() => setModalRatingVisible(true)} style={styles.addRatingButton}>
                                Add Rating
                            </ButtonTouchable>
                        </Box>
                    )}
                        <Text style={styles.titleTextModalInfo}>
                            Metacritic: <Text style={styles.textModalInfo}>{gameInfo?.metacritic}</Text>
                        </Text>
                        <Text style={[styles.titleTextModalInfo, {marginBottom: 0}]}>
                            Year of Release: <Text style={styles.textModalInfo}>{gameInfo?.yearOfRelease}</Text>
                        </Text>

                        <Box mt={5} flexDirection="row" gap={5} wrap="wrap" justifyContent="flex-start" alignItems="center">
                            <Text style={[styles.titleTextModalInfo]}>Studios:</Text>
                                {gameInfo?.studios.map((studio, index) => (
                                    <Text style={styles.roundItem} key={index}>{studio}</Text>
                                ))}
                        </Box>

                        <Box mt={5} flexDirection="row" gap={5} wrap="wrap" justifyContent="flex-start" alignItems="center">
                            <Text style={[styles.titleTextModalInfo]}>Consoles:</Text>
                                {gameInfo?.consoles.map((console, index) => (
                                    <Text style={styles.roundItem} key={index}>{console}</Text>
                                ))}
                        </Box>

                        <Box mt={5} flexDirection="row" gap={5} wrap="wrap" justifyContent="flex-start" alignItems="center">
                            <Text style={[styles.titleTextModalInfo]}>Genres:</Text>
                                {gameInfo?.genres.map((genre, index) => (
                                    <Text style={styles.roundItem} key={index}>{genre}</Text>
                                ))}
                        </Box>

                        <Box mt={5} flexDirection="row" gap={5} wrap="wrap" justifyContent="flex-start" alignItems="center">
                            <ButtonTouchable onPress={() => setModalReviewVisible(true)} style={styles.addRatingButton}>
                                Add Review
                            </ButtonTouchable>
                        </Box>

                        {isCommentsLoading ? (
                            <TextWarning>Loading comments...</TextWarning>
                        ) : (
                            <>
                                {comments && comments.length > 0 && (
                                    <CommentBox data={comments} 
                                    navigateToProfile={(userId) => navigation.navigate('Search', { screen: 'PublicProfile', params: { userId } })} />
                                )}
                                {!allCommentsLoaded && (
                                        <ButtonTouchable
                                        mt={5}
                                        style={{ alignContent: 'center', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', padding: 10, height: 30 }}
                                        onPress={handleIncreaseSize}
                                    >
                                        <EllipsisIcon color={colors.buttonBlue} size={40} horizontal={true} />
                                    </ButtonTouchable>
                                )}
                            
                            </>
                        )}

                        {/*
                        <ButtonTouchable onPress={() => navigation.navigate('ListGameComments', { gameId })} style={styles.addRatingButton}>
                            See All Comments
                        </ButtonTouchable>
                        */}
                    </Box>
                </>
            )}
        </PageDefault>

        {modalRatingVisible && (
            <Modal
                body={modalAddRating()}
                title=""
                isOpen={modalRatingVisible}
                onClose={() => setModalRatingVisible(false)}
                h={240}
            />
        )}

        {modalReviewVisible && (
            <Modal
                body={modalAddComment()}
                title=""
                isOpen={modalReviewVisible}
                onClose={() => setModalReviewVisible(false)}
                h={430}
            />
        )}
        </>
    )
}

const styles = StyleSheet.create({
    titleTextModalInfo: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    textModalInfo: {
        fontWeight: 'normal', 
        fontSize: 16,
    },
    roundItem: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 5,
    },
    starsRatingStatic: {
        marginBottom: 5,
    },
    addRatingButton: {
        marginTop: 10,
        width: 100,
        height: 40,
        borderRadius: 14,
    },
    submitButton: {
        marginTop: 15,
        width: 140,
        height: 40,
        borderRadius: 14,
        alignSelf: 'center',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});