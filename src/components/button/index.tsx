import { ComponentProps, ReactNode } from "react"

import { ButtonSpinner, ButtonText, Button as ThemedButton } from "@gluestack-ui/themed"

type ButtonProps = {
  children: ReactNode
  isLoading?: boolean
} & ComponentProps<typeof ThemedButton>

const Button = (props: ButtonProps) => (
  <ThemedButton gap={1} {...props} isDisabled={props.isLoading || props.isDisabled}>
    <ButtonText>{props.children}</ButtonText>

    {props.isLoading ? <ButtonSpinner size={14} /> : null}
  </ThemedButton>
)

export default Button;