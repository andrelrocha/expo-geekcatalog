import { styled } from "@gluestack-ui/themed";
import { colors } from "../../../utils/colors";
import { Text as GLText } from "@gluestack-ui/themed"; 

const Text = styled(
    GLText,
    {
        color: colors.black,
        fontSize: 12,
        textAlign: 'center',
    }
);

export default Text;