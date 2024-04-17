import { ComponentProps } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

import {
  CheckIcon,
  CloseIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Spinner,
} from "@gluestack-ui/themed"

import { identity } from "../../../libs/functional"

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

  return (
    <Controller
      control={control} // Passa o objeto de controle para o componente Controller.
      name={name} // Passa o nome do campo de entrada para o componente Controller.
      render={({ field: { onChange, value }, fieldState: { invalid } }) => {
        // Renderiza o componente Input com base no estado do campo de entrada.
        const externalValue = _formatVisibleValue(value) || ""; // Formata o valor visível do campo de entrada.

        const isInvalid = externalValue.length > 0 && invalid; // Verifica se o campo é inválido.
        const isValid = externalValue.length > 0 && !invalid; // Verifica se o campo é válido.

        return (
          <Input isInvalid={isInvalid} {...props}>
            {icon ? ( // Renderiza o ícone se fornecido.
            
              <InputSlot>
                <InputIcon as={icon} />
              </InputSlot>
            ) : null}

            <InputField
              onChangeText={(value) => onChange(_formatInternalValue(value))} // Atualiza o valor interno do campo de entrada.
              placeholder={placeholder} // Define o placeholder do campo de entrada.
              value={externalValue} // Define o valor visível do campo de entrada.
              {...inputProps} // Passa as props adicionais para o componente InputField.
            />

            {props.children} {/* Renderiza os filhos do componente InputText. */}

            {/* Renderiza o ícone de validação se o campo for válido ou inválido e a validação for visível. */}
            {isValid && _visibleValidation ? (
              <InputSlot>
                <InputIcon as={CheckIcon} color="$teal400" />
              </InputSlot>
            ) : isInvalid && _visibleValidation ? (
              <InputSlot>
                <InputIcon as={CloseIcon} color="$error400" />
              </InputSlot>
            ) : null}

            {/* Renderiza o indicador de carregamento se o componente estiver em estado de carregamento. */}
            {isLoading ? (
              <InputSlot>
                <Spinner color="$textLight300" size="small" />
              </InputSlot>
            ) : null}
          </Input>
        );
      }}
      rules={rules} // Passa as regras de validação para o componente Controller.
    />
  );
};

export default InputText