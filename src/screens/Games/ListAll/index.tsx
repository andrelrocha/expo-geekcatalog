import React from "react";
import { View, Text, SectionList, TouchableOpacity } from "react-native";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import GameReturn from "../../../types/games/gameReturnDTO";
import { styles } from "./../styles";

export default function ListAllGames() {
    const games: GameReturn[] = useGamesListAll();

    const renderItem = ({ item }: { item: GameReturn }) => {
        return (
            <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subText}>Metacritic: {item.metacritic}</Text>
                <Text style={styles.subText}>Ano de lançamento: {item.yearOfRelease}</Text>
            </TouchableOpacity>
        );
    };

    const renderHeader = () => (
        <Text style={styles.title}>Lista de Jogos</Text>
    );

    return (
        <View style={styles.container}>
            <SectionList
                sections={[{ title: "", data: games }]}
                renderItem={({ item }) => renderItem({ item })}
                renderSectionHeader={() => null}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader}
            />
        </View>
    );
}
