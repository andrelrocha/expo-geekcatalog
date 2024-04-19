import { ComponentProps } from "react"
import { FieldValues } from "react-hook-form"

import { MailIcon } from "lucide-react-native"

import { isEmail } from "../../../libs/validators/email"

import InputText from "../input-text"

// Função de validação personalizada para validar o formato do e-mail.
const validate = (value: string) => {
  if (!value) return true

  return isEmail(value) || "Email inválido"
}

const InputEmail = <T extends FieldValues>(props: ComponentProps<typeof InputText<T>>) => (
    <InputText {...props} icon={MailIcon} rules={{ ...props.rules, validate}} inputProps={{ keyboardType: 'email-address' }}/>
)

export default InputEmail