import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.gray,
    },
    dropdownContainer: {
        borderRadius: 8,
        height: 50,
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 0,
        width: '100%',
    },
    dropdownIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: colors.whiteSmoke,
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    dropdown: {
        height: 50,
        backgroundColor: colors.whiteSmoke,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0,
        shadowRadius: 1.41,
        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
        color: colors.grayPlaceholder,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
});