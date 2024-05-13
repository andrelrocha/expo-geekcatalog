import Text from "../text";
import { styles } from "../styles";
import { View } from "@gluestack-ui/themed";
import { ViewStyle } from "react-native";

interface TextWarningProps {
  children: string
  backgroundColor?: string
  textColor?: string
  fs?: number
  w?: number
  o?: number
  mt?: number
  mb?: number
  mr?: number
  ml?: number
  h?: number
}

const TextWarning = (props: TextWarningProps) => {
    const dynamicStylesBG = {
        backgroundColor: props.backgroundColor || styles.warningWrapper.backgroundColor,
        width: props.w || styles.warningWrapper.width,
        opacity: props.o || styles.warningWrapper.opacity,
        marginTop: props.mt || styles.warningWrapper.marginTop,
        marginBottom: props.mb || styles.warningWrapper.marginBottom,
        marginRight: props.mr || styles.warningWrapper.marginRight,
        marginLeft: props.ml || styles.warningWrapper.marginLeft,
        height: props.h || styles.warningWrapper.height,
    };

    const dynamicStylesText = {
        color: props.textColor || styles.warningText.color,
    };

    return (
        <View style={[styles.warningWrapper, dynamicStylesBG]}>
            <Text fs={props.fs} style={dynamicStylesText as ViewStyle}>{props.children}</Text>
        </View>
    );
}

export default TextWarning;