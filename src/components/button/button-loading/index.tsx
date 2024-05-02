import { ComponentProps, ReactNode } from "react"
import { ViewStyle } from "react-native";
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
  h?: number
  ph?: number
} & ComponentProps<typeof ThemedButton>

const Button = (props: ButtonProps) => {
  const dynamicButtonStyles = {
    backgroundColor: props.backgroundColor || buttonStyles.backgroundColor,
    color: props.backgroundColor || textStyles.color,
    paddingHorizontal: props.ph || 50,
    marginTop: props.mt || 0,
    width: props.w || buttonStyles.width,
    height: props.h || buttonStyles.height,
    //opacity: disabled ? 0.5 : 1,
  };
  
  return (
      <StyledButton
        {...props}
        disabled={props.isLoading || props.disabled}
        ref={null}
        style={dynamicButtonStyles as ViewStyle}
        >
        {!props.isLoading && <ButtonText>{props.children}</ButtonText>}

        {props.isLoading ? <ButtonSpinner size={14} /> : null}
      </StyledButton>
  );
}

export default Button;