import { ReactNode } from "react"
import {StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { stylesSheet } from "../styles";
import { Text } from "@gluestack-ui/themed";

type ButtonProps = TouchableOpacityProps & {
    children: ReactNode
    backgroundColor?: string
    textColor?: string
    mt?: number 
    w?: number
    dynamicPropStyle?: StyleProp<ViewStyle>
} 

const ButtonTouchable = (props: ButtonProps) => {
    const dynamicButtonStyles = {
        backgroundColor: props.backgroundColor || stylesSheet.button.backgroundColor,
        color: props.textColor || stylesSheet.buttonText.color,
        marginTop: props.mt || stylesSheet.button.marginTop,
        width: props.w || stylesSheet.containerButton.width,
    };

    return (
        <TouchableOpacity onPress={props.onPress} style={[stylesSheet.button, stylesSheet.containerButton, dynamicButtonStyles, props.style]}>
            <Text style={stylesSheet.buttonText}>{props.children}</Text>
        </TouchableOpacity>
    );
}

export default ButtonTouchable;