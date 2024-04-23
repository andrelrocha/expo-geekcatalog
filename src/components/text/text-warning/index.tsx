import { colors } from "../../../utils/colors";
import Text from "../text-styled";
import { styles } from "../styles";
import { View } from "@gluestack-ui/themed";

interface TextWarningProps {
  children: string
  backgroundColor?: string
  textColor?: string
  fontSize?: number
}

const TextWarning = (props: TextWarningProps) => {
    const dynamicStylesBG = {
        backgroundColor: props.backgroundColor || styles.warningWrapper.backgroundColor,
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