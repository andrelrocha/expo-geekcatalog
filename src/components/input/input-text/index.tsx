import { ComponentProps, useState } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { InfoIcon } from "lucide-react-native"
import {
  InputField,
  InputIcon,
  InputSlot,
  Spinner,
  Text,
} from "@gluestack-ui/themed"

import { identity } from "../../../libs/functional"
import Input from "../input"
import { CheckIcon, CloseIcon } from "../../icons"

type InputTextProps<T extends FieldValues> = {
    control: Control<T>; 
    formatInternalValue?: (str: string) => string; // Função para formatar o valor interno do campo de entrada.
    formatVisibleValue?: (str: string) => string; // Função para formatar o valor visível do campo de entrada.
    icon?: unknown; 
    inputProps?: ComponentProps<typeof InputField>; // Props adicionais para o componente InputField.
    isLoading?: boolean; 
    name: Path<T>; // Nome do campo de entrada.
    placeholder?: string; 
    rules?: ComponentProps<typeof Controller<T>>["rules"]; // Regras de validação para o campo de entrada.
    visibleValidation?: boolean; // Indica se a validação deve ser exibida visualmente.
    staticIcon?: boolean;
    bColorFocus?: string;
    editable?: boolean;
    numberOfLines?: number;
    maxLength?: number;
  } & ComponentProps<typeof Input>; // Junta as props do componente Input com as props específicas do InputText.
  

const InputText = <T extends FieldValues>({
  control,
  formatInternalValue,
  formatVisibleValue,
  icon,
  inputProps,
  isLoading,
  name,
  placeholder,
  rules,
  visibleValidation,
  staticIcon,
  editable,
  numberOfLines = 1,
  maxLength,
  ...props
}: InputTextProps<T>) => {
  // Definindo funções de formatação padrão, caso não sejam fornecidas.
  const _formatVisibleValue = formatVisibleValue || identity; // Usa a função identity se formatVisibleValue não for fornecida.
  const _formatInternalValue = formatInternalValue || identity; // Usa a função identity se formatInternalValue não for fornecida.

  // Definindo a visibilidade padrão da validação.
  const _visibleValidation = visibleValidation ?? true

  const handleInputIcon = (isValid: boolean, isInvalid: boolean) => {
    if (icon === 0) return null;
    
    if (icon && !isValid && !isInvalid || icon && staticIcon) {
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
    return (<InputSlot>
      <InputIcon as={InfoIcon} />
    </InputSlot>);
  };

  return (
    <Controller
      control={control} 
      name={name} 
      render={({ field: { onChange, value }, fieldState: { invalid } }) => {
        // Renderiza o componente Input com base no estado do campo de entrada.
        const externalValue = _formatVisibleValue(value) || ""; // Formata o valor visível do campo de entrada.

        const isInvalid = externalValue.length > 0 && invalid;
        const isValid = externalValue.length > 0 && !invalid;

        const inputFieldHeight = numberOfLines > 1 ? numberOfLines * 50 : 50;

        return (
          <Input isInvalid={isInvalid} {...props} style={{ height: inputFieldHeight}}>
              <InputField
                placeholder={placeholder}
                value={externalValue}
                {...inputProps}
                onChangeText={(value) => onChange(_formatInternalValue(value))}
                editable={editable}
                multiline={numberOfLines > 1}
                style={{ paddingTop: numberOfLines > 1 ? 10 : 0 }}
                maxLength={maxLength}
                />

            <Text>{props.children}</Text> 

            {handleInputIcon(isValid, isInvalid)}

            {isLoading ? (
              <InputSlot>
                <Spinner color="$textLight300" size="small" />
              </InputSlot>
            ) : null}
          </Input>
        );
      }}
      rules={rules} 
    />
  );
};  

export default InputText