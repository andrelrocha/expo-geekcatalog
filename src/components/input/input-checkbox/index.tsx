import { ComponentProps, ReactNode } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
} from "@gluestack-ui/themed"
import { StyleSheet } from "react-native"

type InputCheckboxProps<T extends FieldValues> = {
  control: Control<T>
  label?: ReactNode
  name: Path<T>
} & ComponentProps<typeof Checkbox>

const styles = StyleSheet.create({
    checkbox: {
        marginRight: 10,
    },
})

const InputCheckbox = <T extends FieldValues>({
  control,
  label,
  name,
  ...props
}: InputCheckboxProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <Checkbox onChange={(value) => onChange(value ? props.value : null)} {...props}>
          <CheckboxIndicator style={styles.checkbox}>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>

          <CheckboxLabel>{label}</CheckboxLabel>
        </Checkbox>
      )}
    />
  )
}

export default InputCheckbox