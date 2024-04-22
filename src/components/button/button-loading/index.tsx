import { ComponentProps, ReactNode } from "react"

import { ButtonSpinner, ButtonText, styled, Button as ThemedButton } from "@gluestack-ui/themed"
import { buttonStyles, textStyles } from "../styles";

type ButtonProps = {
  children: ReactNode
  isLoading?: boolean
  backgroundColor?: string
  textColor?: string
} & ComponentProps<typeof ThemedButton>

const StyledButton = styled(
  ThemedButton,
  {
    ...buttonStyles,
    _text: {
      ...textStyles,
    },
  }, {
    descendantStyle: ["_text"],
  }
)

const Button = (props: ButtonProps) => {
  const dynamicButtonStyles = {
    backgroundColor: props.backgroundColor || buttonStyles.backgroundColor,
    color: props.backgroundColor || textStyles.color,
  };
  
  return (
      <StyledButton
        {...props}
        disabled={props.isLoading || props.disabled}
        ref={null}
        style={dynamicButtonStyles}
        >
        {!props.isLoading && <ButtonText>{props.children}</ButtonText>}

        {props.isLoading ? <ButtonSpinner size={14} /> : null}
      </StyledButton>
  );
}

export default Button;