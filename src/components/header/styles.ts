import { Platform, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 25 : 5,
        backgroundColor: colors.sage,
    },
    logo: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    title: {
        fontSize: 26,
        lineHeight: 40,
        fontWeight: 'bold',
        color: colors.black
    },
});