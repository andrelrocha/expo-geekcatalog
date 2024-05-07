import { ComponentProps } from "react"
import { FieldValues } from "react-hook-form"

import { Calendar } from "lucide-react-native"

import { isDateValid } from "../../../libs/validators/validations"

import InputMask from "../input-mask"

const DEFAULT_ERROR_MESSAGE = "Data Inválida"

const validate = (value: string) => {
  if (!value) return true
  const reference = "before"

  return isDateValid(value, reference) || DEFAULT_ERROR_MESSAGE
}

const InputDate = <T extends FieldValues>(props: ComponentProps<typeof InputMask<T>>) => {
  let icon;
  if (props.icon === 0) icon = 0;
  else icon = Calendar;
  
  return (
  <InputMask
    {...props}
    icon={icon}
    inputProps={{ keyboardType: "numeric", ...props.inputProps }}
    mask="99/99/9999"
    rules={{ validate, ...props.rules }}
  />
)
}
export default InputDate