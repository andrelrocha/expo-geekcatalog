import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        paddingTop: 15,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.black,
        textAlign: 'center',
      },
    itemContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 5,
        borderColor: colors.sage,
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',

        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height:  2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        color: colors.black,
    },
    subText: {
        fontSize: 14,
        color: colors.black, 
    },
});