import { ComponentProps, ReactNode } from "react"

import { ButtonSpinner, ButtonText, Button as ThemedButton } from "@gluestack-ui/themed"
import { buttonStyles, textStyles } from "../styles";
import StyledButton from "../button-styled";

type ButtonProps = {
  children: ReactNode
  isLoading?: boolean
  backgroundColor?: string
  textColor?: string
  mt?: number
  w?: number
  ph?: number
} & ComponentProps<typeof ThemedButton>

const Button = (props: ButtonProps) => {
  const dynamicButtonStyles = {
    backgroundColor: props.backgroundColor || buttonStyles.backgroundColor,
    color: props.backgroundColor || textStyles.color,
    paddingHorizontal: props.ph || 50,
    marginTop: props.mt || 0,
    width: props.w || 200,
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