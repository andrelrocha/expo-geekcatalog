import { ComponentProps } from "react"
import { FieldValues } from "react-hook-form"

import { Phone } from "lucide-react-native"

import { isMobilePhone } from "../../../libs/validators/gov"

import InputMask from "../input-mask"

const DEFAULT_ERROR_MESSAGE = "Telefone Inválido"

const validate = (value: string) => {
  if (!value) return true

  return isMobilePhone(value) || DEFAULT_ERROR_MESSAGE
}

const InputPhone = <T extends FieldValues>(props: ComponentProps<typeof InputMask<T>>) => (
  <InputMask
    {...props}
    formatInternalValue={(_v: any, raw: any) => raw || ""}
    icon={Phone}
    inputProps={{ keyboardType: "numeric", ...props.inputProps }}
    mask="(99) 99999-9999"
    rules={{ validate, ...props.rules }}
  />
)

export default InputPhone