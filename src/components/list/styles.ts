import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: 'center',
      width: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300
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
    itemHeader: {
        flexDirection: 'row', 
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
    itemButton: {
        marginLeft: 10,
    },
    gridItemContainer: {
        marginHorizontal: 10,
        marginVertical: 5,  
        borderWidth: 5,
        borderColor: colors.sage,
        backgroundColor: colors.sageOpacity,
        borderRadius: 12,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',

        width: 150,
        height: 100,

        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height:  2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        overflow: 'hidden',
    },
    gridItemTitle: {
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: 'center',
    },
    gridItemText: {
        marginBottom: 5,
        textAlign: 'center',
    },
    modalItemLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 5,
    },
    modalItemValue: {
        fontSize: 16,
        color: colors.black,
        marginBottom: 10,
    },
});