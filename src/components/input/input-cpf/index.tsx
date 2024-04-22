import { ComponentProps } from "react"
import { FieldValues } from "react-hook-form"

import { InfoIcon } from "lucide-react-native"

import { isCPF } from "../../../libs/validators/validations"

import InputMask from "../input-mask"

const DEFAULT_ERROR_MESSAGE = "CPF Inválido"

const validate = (value: string) => {
  if (!value) return true

  return isCPF(value) || DEFAULT_ERROR_MESSAGE
}

const InputCPF = <T extends FieldValues>(props: ComponentProps<typeof InputMask<T>>) => (
  <InputMask
    {...props}
    icon={InfoIcon}
    inputProps={{ keyboardType: "numeric", ...props.inputProps }}
    mask="999.999.999-99"
    rules={{ validate, ...props.rules }}
  />
)

export default InputCPF