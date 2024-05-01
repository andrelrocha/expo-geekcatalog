import { ReactNode } from "react";
import { styled } from "@gluestack-ui/themed";
import { Text as GLText } from "@gluestack-ui/themed"; 
import { StyleSheet, ViewStyle } from "react-native";
import { colors } from "../../../utils/colors";

interface TextProps {
    children: ReactNode;
    color?: string,
    fontSize?: number,
    textAlign?: string,
    w?: number;
    mt?: number;
    mb?: number;
    mr?: number;
    ml?: number;
    style?: ViewStyle;
}

const textStyles = StyleSheet.create({
    text: {
        color: colors.black,
        fontSize: 12,
        textAlign: 'center',
        width: '100%',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
    }
});

const StyledText = styled(
    GLText,
    {
        ...textStyles.text,
    }
);

const Text = (props: TextProps) => {
    const dynamicStyles = {
        color: props.color || textStyles.text.color,
        fontSize: props.fontSize || textStyles.text.fontSize,
        textAlign: props.textAlign || textStyles.text.textAlign,
        width: props.w || textStyles.text.width,
        marginTop: props.mt || textStyles.text.marginTop,
        marginBottom: props.mb || textStyles.text.marginBottom,
        marginLeft: props.ml || textStyles.text.marginLeft,
        marginRight: props.mr || textStyles.text.marginRight,
    };

    return (
        <StyledText style={[props.style, dynamicStyles] as ViewStyle}>
            {props.children}
        </StyledText>
    );
}

export default Text;
