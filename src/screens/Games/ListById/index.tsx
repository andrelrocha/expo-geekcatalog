import React, { useEffect, useState } from "react";
import PageDefault from "../../Default";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../../../context/hooks";
import { useGamesFullInfoUser } from "../../../context/hooks/games/useGamesFullInfoUser";
import { Box, Heading, ImageTouchable, TextWarning } from "../../../components";
import { StyleSheet, Text } from "react-native";
import { View } from "lucide-react-native";

type GameByIdParams = {
    gameId: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'ListGameById'>;

export default function ListGameById({ navigation, route }: Props) {
    const { gameId } = route.params as GameByIdParams;
    const { currentUser } = useAuth();

    const { isLoading, gameInfo, loadGameInfoData } = useGamesFullInfoUser();

    useEffect(() => {
        loadGameInfoData(gameId);
    }, []);

    return (
        <PageDefault>
            {isLoading ? (
                <TextWarning mt={50} w={300} fs={20} h={40} fw="bold">Loading...</TextWarning>
            ) : (
                <>
                    <Heading w={280} mt={5} mb={15} fs={28}>{gameInfo?.name || 'Game'}</Heading>
                    <ImageTouchable w={280} h={280} key={gameInfo?.id} source={{uri: gameInfo?.imageUrl}} alt="Image Game" br={10}/>
                    <Box w={280} mt={15} mb={15} alignItems="flex-start">
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

                    </Box>
                </>
            )}
        </PageDefault>
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
});