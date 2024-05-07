import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: 'center',
      width: '100%',
      paddingTop: 20,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    itemContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 5,
        borderColor: colors.sage,
        backgroundColor: colors.sageOpacity,
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
        alignSelf: 'center',

        width: 300,

        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height:  2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        color: colors.black,
        textAlign: 'center',
    },
    itemText: {
        fontSize: 14,
        color: colors.black, 
    },
});