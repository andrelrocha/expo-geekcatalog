import { styled, Button as ThemedButton } from "@gluestack-ui/themed";
import { buttonStyles, textStyles } from "../styles";

const StyledButton = styled(
ThemedButton,
{
    ...buttonStyles,
    _text: {
    ...textStyles,
    },
},
{
    descendantStyle: ["_text"],
}
);

export default StyledButton;