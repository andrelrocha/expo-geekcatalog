import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    warningWrapper: {
        marginBottom: 10,
        borderRadius: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: colors.blackOpacity,
        backgroundColor: colors.sageOpacity,
        width: '100%',
    },
    warningText: {
        color: colors.black,
        fontSize: 12,
    },
});