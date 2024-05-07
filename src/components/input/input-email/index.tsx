import { ComponentProps } from "react"
import { FieldValues } from "react-hook-form"

import { MailIcon } from "lucide-react-native"

import { isEmail } from "../../../libs/validators/email"

import InputText from "../input-text"

const validate = (value: string) => {
  if (!value) return true

  return isEmail(value) || "Email inválido"
}

const InputEmail = <T extends FieldValues>(props: ComponentProps<typeof InputText<T>>) => {
  let icon;
  if (props.icon === 0) icon = 0;
  else icon = MailIcon;

  return (
    <InputText {...props} icon={icon} rules={{ ...props.rules, validate}} inputProps={{ keyboardType: 'email-address' }}/>
  )
}

export default InputEmail