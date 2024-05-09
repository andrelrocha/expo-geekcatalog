import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    dropdownContainer: {
        borderRadius: 6,
        height: 50,
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 0,
        width: '100%',
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
    dropdown: {
        height: 50,
        backgroundColor: colors.whiteSmoke,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        padding: 12,
        shadowOpacity: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 1.41,
        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 14,
        color: colors.grayPlaceholder,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderRadius: 10
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
    label: {
        position: 'absolute',
        backgroundColor: colors.whiteSmoke,
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    itemStyle: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: 'white',
    },
    separatorStyle: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grayOpacity,
    },
    styleDropdownMenu: {
        width: 200,
        borderRadius: 10,
        backgroundColor: colors.whiteSmoke,
    },
    styleInputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },
    styleItemsContainer: {
        maxHeight: 150,
    },
    styleSelectorContainer: {
        backgroundColor: colors.lightGray,
        borderRadius: 10,
    },
    styleTextDropdown: {
        fontSize: 16,
        color: colors.black,
    },
    styleTextDropdownSelected: {
        fontSize: 16,
        color: colors.blue,
    },
    styleTextTag: {
        fontSize: 16,
        color: colors.black,
    },
    styleTextInput: {
        flex: 1,
        fontSize: 16,
        color: colors.black,
    },
    styleRowList: {
        backgroundColor: colors.whiteSmoke,
    },
    styleRowListText: {
        fontSize: 16,
        color: colors.black,
    },
    selectedItemTextColor: {
        color: colors.blue,
    },
    selectedItemIconColor: {
        color: colors.blue,
    },
 
});