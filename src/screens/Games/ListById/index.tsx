import React, { useEffect } from "react";
import { ParamListBase } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PageDefault from "../../Default";
import { useGamesFullInfoUser } from "../../../context/hooks/games/useGamesFullInfoUser";
import { AppStarRating, Box, ButtonTouchable, Heading, ImageTouchable, InputWithLabel, Modal, TextWarning } from "../../../components";
import { colors } from "../../../utils/colors";
import { useAuth } from "../../../context/hooks";

type GameByIdParams = {
    gameId: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'ListGameById'>;

export default function ListGameById({ navigation, route }: Props) {
    const { gameId } = route.params as GameByIdParams;
    const { currentUser } = useAuth();

    const { isLoading, gameInfo, loadGameInfoData, modalRatingVisible, setModalRatingVisible, gameRating, setGameRating, 
        addGameRatingMethod, userRatingAdded, userRating, loadComments, comments } = useGamesFullInfoUser();

    useEffect(() => {
        loadGameInfoData(gameId);
        loadComments(gameId);
    }, [userRatingAdded, gameId]);

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

                <ButtonTouchable onPress={handleRatingSubmit} style={styles.submitRatingButton}>
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
                                <ButtonTouchable onPress={() => setModalRatingVisible(true)} style={styles.addRatingButton}>
                                    Add Rating
                                </ButtonTouchable>
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
                        <Text style={styles.titleTextModalInfo}>
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

                        {/*
                        {comments && comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <View key={index} style={styles.commentBox}>
                                    <Text style={styles.commentHeader}>{comment.username}: {comment.rating}</Text>
                                    <Text style={styles.commentText}>{comment.comment}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noCommentsText}>No comments available.</Text>
                        )}
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
        </>
    )
}

const styles = StyleSheet.create({
    titleTextModalInfo: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
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
    submitRatingButton: {
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