import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { colors } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';

type PaginationButtonsProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const PaginationButtons = (props: PaginationButtonsProps) => {
    const renderPageButtons = () => {
        const buttons = [];

        for (let i = 0; i < props.totalPages; i++) {
            const pageNumber = i + 1;
            const isActive = pageNumber === props.currentPage + 1;

            buttons.push(
                <TouchableOpacity
                    key={pageNumber}
                    onPress={() => props.onPageChange(pageNumber - 1)}
                    style={[styles.paginationButton, {
                        backgroundColor: isActive ? colors.buttonBlue : colors.gray,
                    }]}
                >
                    <Text style={{ color: 'white' }}>{pageNumber}</Text>
                </TouchableOpacity>
            );
        }

        return buttons;
    }

    return (
        <ScrollView 
            contentContainerStyle={styles.paginationContainer}>
            {renderPageButtons()}
        </ScrollView>
    );
};

export default PaginationButtons;
