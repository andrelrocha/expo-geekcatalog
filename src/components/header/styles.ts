import { Platform, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 10,
        backgroundColor: colors.sage,
        paddingTop: Platform.OS === 'ios' ? 25 : 5,
    },
    logo: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    title: {
        fontSize: 30,
        lineHeight: 40,
        fontWeight: 'bold',
        color: colors.black
    },
});