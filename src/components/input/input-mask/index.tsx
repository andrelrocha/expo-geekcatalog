import { ComponentProps } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { TextInput } from "react-native"
import { MaskedTextInput } from "react-native-mask-text"

import { InputIcon, InputSlot } from "@gluestack-ui/themed"
import Input from "../input"

import { identity } from "../../../libs/functional"

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
  ...props
}: InputMaskProps<T>) => {
  const _formatVisibleValue = formatVisibleValue || identity
  const _formatInternalValue = formatInternalValue || identity
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { invalid } }) => {
        const externalValue = _formatVisibleValue(value) || ""

        const isInvalid = externalValue.length > 0 && invalid

        return (
          <Input isInvalid={isInvalid} {...props}>
            <MaskedTextInput
              mask={mask}
              onChangeText={(value, rawValue) => onChange(_formatInternalValue(value, rawValue))}
              placeholder={placeholder}
              style={{ flex: 1, fontSize: 16, marginLeft: 12 }}
              value={externalValue}
              {...inputProps}
            />

            {icon ? (
              <InputSlot>
                <InputIcon as={icon} />
              </InputSlot>
            ) : null}
          </Input>
        )
      }}
      rules={rules}
    />
  )
}
export default InputMask