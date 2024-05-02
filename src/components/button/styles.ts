import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { colors } from "../../utils/colors"

export const buttonStyles: ViewStyle = {
    backgroundColor: colors.buttonBlue,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 0,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
};

export const textStyles: TextStyle = {
    color: colors.whiteSmoke,
    fontSize: 16,
    textAlign: 'center',
};

export const buttonImage: ViewStyle = {
    width: 60,
    height: 40,
    borderRadius: 12,
    borderColor: colors.black,
    borderWidth: 0.5,
    backgroundColor: colors.gray,
    padding: 5,
    paddingTop: 10,
    shadowOpacity: 0,
};

export const stylesSheet = StyleSheet.create({
    button: {
        ...buttonStyles
    },
    buttonText: {
        ...textStyles
    },
    buttonImage: {
        ...buttonImage
    },
    containerButton: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
});