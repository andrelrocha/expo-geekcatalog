import { ComponentProps, useState } from "react"
import { FieldValues } from "react-hook-form"

import { InputIcon, InputSlot } from "@gluestack-ui/themed"
import { EyeIcon, EyeOffIcon, LockKeyholeIcon } from "lucide-react-native"

import { isValidPassword } from "../../../libs/validators/password"

import InputText from "../input-text"

const DEFAULT_ERROR_MESSAGE = "Senha inválida"

const validate = (value: string) => {
  if (!value) return true

  return isValidPassword(value) || DEFAULT_ERROR_MESSAGE
}
const InputPassword = <T extends FieldValues>(props: ComponentProps<typeof InputText<T>>) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => setShowPassword(!showPassword)

  return (
    <InputText
      {...props}
      inputProps={{
        ...props.inputProps,
        secureTextEntry: !showPassword,
        type: showPassword ? "text" : "password",
      }}
      rules={{ validate, ...props.rules }}
    >
      <InputSlot onPress={togglePassword}>
        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
      </InputSlot>
    </InputText>
  )
}

export default InputPassword