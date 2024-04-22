import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { colors } from "../../utils/colors"

export const buttonStyles: ViewStyle = {
    backgroundColor: colors.buttonBlue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 50,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
};

export const textStyles: TextStyle = {
    color: colors.whiteSmoke,
    fontSize: 16
};

export const stylesSheet = StyleSheet.create({
    button: {
        ...buttonStyles
    },
    buttonText: {
        ...textStyles
    },
    containerButton: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});