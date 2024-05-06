import React from "react";
import { Text, SectionList, TouchableOpacity, View } from "react-native";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import GameReturn from "../../../types/games/gameReturnDTO";
import { styles } from "./../styles";
import { TextWarning } from "../../../components";

export default function ListAllGames() {
    const games = useGamesListAll().games;
    const isLoading = useGamesListAll().isLoading;

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
            {isLoading ? (
                <TextWarning w={200}>Carregando...</TextWarning>
            ) : (
                <SectionList
                    sections={[{ title: "", data: games }]}
                    renderItem={({ item }) => renderItem({ item })}
                    renderSectionHeader={() => null}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={renderHeader}
                    showsVerticalScrollIndicator={false}
                    decelerationRate="fast"
                    //renderSectionFooter={() => <View style={{ height: 20 }} />  - FALTA IMPLEMENTAR PAGINAÇÃO
                />
            )}
        </View>
    );
}