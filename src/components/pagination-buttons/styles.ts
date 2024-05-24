import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
        flexWrap: 'wrap',
    },
    paginationButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 5,
        borderRadius: 14,
    },
});