import { ComponentProps } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { TextInput } from "react-native"
import { MaskedTextInput } from "react-native-mask-text"
import { InputIcon, InputSlot } from "@gluestack-ui/themed"

import Input from "../input"
import { CheckIcon, CloseIcon } from "../../icons"
import { identity } from "../../../libs/functional"
import { InfoIcon } from "lucide-react-native"

type InputMaskProps<T extends FieldValues> = {
  control: Control<T>
  formatInternalValue?: (str: string, rawStr?: string) => string
  formatVisibleValue?: (str: string) => string
  icon?: unknown
  inputProps?: ComponentProps<typeof TextInput>
  mask?: string
  name: Path<T>
  placeholder?: string
  rules?: ComponentProps<typeof Controller<T>>["rules"]
  visibleValidation?: boolean
  editable?: boolean
} & ComponentProps<typeof Input>

const InputMask = <T extends FieldValues>({
  control,
  formatInternalValue,
  formatVisibleValue,
  icon,
  inputProps,
  mask,
  name,
  placeholder,
  rules,
  visibleValidation,
  editable,
  ...props
}: InputMaskProps<T>) => {
  const _formatVisibleValue = formatVisibleValue || identity
  const _formatInternalValue = formatInternalValue || identity

  const _visibleValidation = visibleValidation ?? true

  const handleInputIcon = (isValid: boolean, isInvalid: boolean) => {
    if (icon === 0) return null;

    if (icon && !isValid && !isInvalid) {
      return (
        <InputSlot>
          <InputIcon as={icon} />
        </InputSlot>
      );
    } else if (isValid && _visibleValidation) {
      return (
        <InputSlot>
          <CheckIcon />
        </InputSlot>
      );
    } else if (isInvalid && _visibleValidation) {
      return (
        <InputSlot>
          <CloseIcon />
        </InputSlot>
      );
    }
    return (
      <InputSlot>
        <InputIcon as={InfoIcon} />
      </InputSlot>
    );
  };
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { invalid } }) => {
        const externalValue = _formatVisibleValue(value) || ""

        const isInvalid = externalValue.length > 0 && invalid
        const isValid = externalValue.length > 0 && !invalid

        return (
          <Input isInvalid={isInvalid} {...props}>
            <MaskedTextInput
              mask={mask}
              onChangeText={(value, rawValue) => onChange(_formatInternalValue(value, rawValue))}
              placeholder={placeholder}
              style={{ flex: 1}}
              value={externalValue}
              editable={editable}
              {...inputProps}
            />

            {handleInputIcon(isValid, isInvalid)} 
          </Input>
        )
      }}
      rules={rules}
    />
  )
}
export default InputMask