import { ComponentProps, ReactNode } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@gluestack-ui/themed"
import { StyleSheet } from "react-native"

import { CheckIcon } from "../../icons"
import { colors } from "../../../utils/colors"

type InputCheckboxProps<T extends FieldValues> = {
    control: Control<T>
    label?: ReactNode
    name: Path<T>
    w?: number
    fs?: number
    mt?: number
    mb?: number
} & ComponentProps<typeof Checkbox>

const styles = StyleSheet.create({
    checkbox: {
        marginRight: 10,
        marginTop: 5,
        marginBottom: 15,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    checkboxIndicator: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    checkboxLabel: {
        fontSize: 16,
        alignItems: 'center',
    },
})

const InputCheckbox = <T extends FieldValues>({
  control,
  label,
  name,
  ...props
}: InputCheckboxProps<T>) => {
    const dynamicStyles = {
        width: props.w || styles.checkbox.width,
        marginTop: props.mt || styles.checkbox.marginTop,
        marginBottom: props.mb || styles.checkbox.marginBottom,
    }

    const dynamicStylesLabel = {
      fontSize: props.fs || styles.checkboxLabel.fontSize,
    }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <Checkbox style={[styles.checkbox, dynamicStyles]} onChange={(value) => onChange(value ? props.value : null)} {...props}>
          <CheckboxIndicator style={styles.checkboxIndicator}>
            <CheckboxIcon as={CheckIcon}/>
          </CheckboxIndicator>

          <CheckboxLabel style={[styles.checkboxLabel, dynamicStylesLabel]}>{label}</CheckboxLabel>
        </Checkbox>
      )}
    />
  )
}

export default InputCheckbox