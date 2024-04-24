import Text from "../text-styled";
import { styles } from "../styles";
import { View } from "@gluestack-ui/themed";

interface TextWarningProps {
  children: string
  backgroundColor?: string
  textColor?: string
  fontSize?: number
  w?: number
  o?: number
}

const TextWarning = (props: TextWarningProps) => {
    const dynamicStylesBG = {
        backgroundColor: props.backgroundColor || styles.warningWrapper.backgroundColor,
        width: props.w || styles.warningWrapper.width,
        opacity: props.o || styles.warningWrapper.opacity,
    };

    const dynamicStylesText = {
        color: props.textColor || styles.warningText.color,
        fontSize: props.fontSize || 12,
    };

    return (
        <View style={[styles.warningWrapper, dynamicStylesBG]}>
            <Text style={[styles.warningText, dynamicStylesText]}>{props.children}</Text>
        </View>
    );
}

export default TextWarning;