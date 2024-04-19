import { ComponentProps, ReactNode } from "react"

import { ButtonSpinner, ButtonText, styled, Button as ThemedButton } from "@gluestack-ui/themed"
import { colors } from "../../utils/colors"

type ButtonProps = {
  children: ReactNode
  isLoading?: boolean
  //backgroundColor?: string
} & ComponentProps<typeof ThemedButton>

const StyledButton = styled(
  ThemedButton,
  {
    //FALTA FAZER COM QUE BACKGROUND COLOR SEJA PASSADO COMO PROPS
    backgroundColor: colors.buttonBlue,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 60,
    _text: {
      color: colors.whiteSmoke,
      fontSize: 16,
    },
  }, {
    descendantStyle: ["_text"],
  }
)

const Button = (props: ButtonProps) => (
    <StyledButton
      {...props}
      disabled={props.isLoading || props.disabled}
      ref={null}
      >
      {!props.isLoading && <ButtonText>{props.children}</ButtonText>}

      {props.isLoading ? <ButtonSpinner size={14} /> : null}
    </StyledButton>
);

export default Button;