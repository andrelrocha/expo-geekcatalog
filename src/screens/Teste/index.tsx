import React from "react";

import Button from "../../components/button";
import InputEmail from "../../components/input/input-email";
import InputText from "../../components/input/input-text";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Box, Heading, Text } from "@gluestack-ui/themed"

const DEFAULT_FORM_VALUES = { email: "", name: "" }

const Teste = () => {

    const {
        control,
        formState: { isValid },
        handleSubmit,
      } = useForm({ defaultValues: DEFAULT_FORM_VALUES, mode: "onChange" })

    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <Box gap={8}>
            <Heading >Acesso</Heading>
                <InputText
                    name="name"
                    control={control} 
                    rules={{ required: "Campo obrigatório" }}
                    placeholder="Nome"
                />
                <InputEmail
                    name="email"
                    control={control}
                    rules={{ required: "Campo obrigatório" }}
                    placeholder="Email"
                />
                <Button
                    isDisabled={!isValid}
                    >
                    Entrar
                </Button>
                <Box flexDirection="row" justifyContent="center">
          <Text >Primeira vez no App? </Text>
        </Box>
      </Box>
    </ScrollView>
  )
}

export default Teste;