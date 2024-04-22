import { ReactNode } from "react"
import {TouchableOpacity } from "react-native";
import { stylesSheet } from "../styles";
import { Text } from "@gluestack-ui/themed";

type ButtonProps = {
    children: ReactNode
    backgroundColor?: string
    textColor?: string
} 

const ButtonTouchable = (props: ButtonProps) => {
    const dynamicButtonStyles = {
        backgroundColor: props.backgroundColor || stylesSheet.button.backgroundColor,
        color: props.backgroundColor || stylesSheet.buttonText.color,
    };

    return (
        <TouchableOpacity style={[stylesSheet.button, stylesSheet.containerButton, dynamicButtonStyles]}>
            <Text style={stylesSheet.buttonText}>{props.children}</Text>
        </TouchableOpacity>
    );
}

export default ButtonTouchable;