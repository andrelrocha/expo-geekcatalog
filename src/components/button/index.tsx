import { ComponentProps, ReactNode } from "react"

import { ButtonSpinner, ButtonText, styled, Button as ThemedButton } from "@gluestack-ui/themed"
import { colors } from "../../utils/colors"

type ButtonProps = {
  children: ReactNode
  isLoading?: boolean
  backgroundColor?: string
} & ComponentProps<typeof ThemedButton>

const StyledButton = styled(
  ThemedButton,
  {
    backgroundColor: colors.buttonBlue,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 60,
  }
)

const StyledText = styled(
  ButtonText,
  {
    color: colors.whiteSmoke,
    fontSize: 16,
  }
)

const Button = (props: ButtonProps) => (
    <StyledButton
      {...props}
      disabled={props.isLoading || props.disabled}
      ref={null}
      >
      {!props.isLoading && <StyledText>{props.children}</StyledText>}

      {props.isLoading ? <ButtonSpinner size={14} /> : null}
    </StyledButton>
);
export default Button;