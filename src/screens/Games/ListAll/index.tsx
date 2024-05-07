import React, { useEffect, useState } from "react";
import { Text, SectionList, TouchableOpacity, View } from "react-native";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import GameReturn from "../../../types/games/gameReturnDTO";
import { styles } from "./../styles";
import { Heading, PaginationButtons, TextWarning } from "../../../components";
import { colors } from "../../../utils/colors";

export default function ListAllGames() {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const {games, isLoading, paginationInfo} = useGamesListAll({ page: currentPageUser});

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
        <Heading fs={32} mb={20}>Lista de Jogos</Heading>
    );

    const renderFooter = () => {        
        return (
            <PaginationButtons 
                totalPages={paginationInfo.totalPages} 
                currentPage={paginationInfo.currentPage} 
                onPageChange={setCurrentPageUser}
            />
        );
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <TextWarning w={200}>Carregando...</TextWarning>
            ) : (
                <SectionList
                    sections={[{  data: games }]}
                    renderItem={({ item }) => renderItem({ item })}
                    renderSectionHeader={() => null}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={renderHeader}
                    showsVerticalScrollIndicator={false}
                    decelerationRate="fast"
                    renderSectionFooter={renderFooter}
                />
            )}
        </View>
    );
}