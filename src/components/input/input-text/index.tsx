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
import { colors } from "../../../utils/colors"

type InputTextProps<T extends FieldValues> = {
    control: Control<T>; // O objeto de controle fornecido pelo React Hook Form para controlar o formulário.
    formatInternalValue?: (str: string) => string; // Função para formatar o valor interno do campo de entrada.
    formatVisibleValue?: (str: string) => string; // Função para formatar o valor visível do campo de entrada.
    icon?: unknown; // Ícone opcional a ser exibido ao lado do campo de entrada.
    inputProps?: ComponentProps<typeof InputField>; // Props adicionais para o componente InputField.
    isLoading?: boolean; // Indica se o componente está em um estado de carregamento.
    name: Path<T>; // Nome do campo de entrada.
    placeholder?: string; // Texto de placeholder para o campo de entrada.
    rules?: ComponentProps<typeof Controller<T>>["rules"]; // Regras de validação para o campo de entrada.
    visibleValidation?: boolean; // Indica se a validação deve ser exibida visualmente.
    bColorFocus?: string;
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
  ...props
}: InputTextProps<T>) => {
  // Definindo funções de formatação padrão, caso não sejam fornecidas.
  const _formatVisibleValue = formatVisibleValue || identity; // Usa a função identity se formatVisibleValue não for fornecida.
  const _formatInternalValue = formatInternalValue || identity; // Usa a função identity se formatInternalValue não for fornecida.

  // Definindo a visibilidade padrão da validação.
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

        return (
          <Input isInvalid={isInvalid} {...props} >
              <InputField
                placeholder={placeholder}
                value={externalValue}
                {...inputProps}
                onChangeText={(value) => onChange(_formatInternalValue(value))}
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