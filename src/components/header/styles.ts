import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 10,
        paddingTop: 30,
        backgroundColor: colors.sage
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
    }
});