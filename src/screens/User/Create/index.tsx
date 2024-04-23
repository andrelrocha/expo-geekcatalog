import React, { useState } from "react";
import { Text  } from "react-native";
import { useForm } from "react-hook-form";
import { styles } from "../styles";
import PageDefault from "../../Default";
import { useAuth } from "../../../context/hooks";
import InputCPF from "../../../components/input/input-cpf";
import { BoxInput, Heading, InputEmail, InputPassword, InputText } from "../../../components";
import InputPhone from "../../../components/input/input-phone";
import InputPasswordValidation from "../../../components/input/input-password-validation";
import ButtonTouchable from "../../../components/button/button-touchable";
import ButtonAddImage from "../../../components/button/button-add-image";
import { colors } from "../../../utils/colors";
import TextWarning from "../../../components/text/text-warning";
import { View } from "@gluestack-ui/themed";


const DEFAULT_FORM_VALUES = {
  cpf: "",
  email: "",
  name: "",
  password: "",
  passwordConfirm: "",
  phone: "",
  birthday: "",
  term: "",
}

function Create() {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
  })
  const { isLoading, signUp } = useAuth()

  const [termsVisibility, setTermsVisibility] = useState(false)

  const [password, passwordConfirm, term] = watch("password", "passwordConfirm", "term");

  
  return (
    <PageDefault>
        <Heading>
          Welcome to Geek Catalog!
        </Heading>

        <Text style={styles.subtitle}>
          Fill in the fields below to create your account
        </Text>

        <BoxInput>
          <InputText control={control} name="name" placeholder="Nome Completo" rules={{ required: true }} />

          <InputCPF control={control} name="cpf" placeholder="CPF" rules={{ required: true }} />

          <InputPhone control={control} name="phone" placeholder="Celular" rules={{ required: true }}/>

          <InputEmail control={control} name="email" placeholder="E-mail" rules={{ required: true }}/>

          <InputPasswordValidation control={control} name="password" placeholder="Senha" rules={{ required: true}}/>
          <TextWarning>Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number.</TextWarning>
          <InputPassword control={control} name="passwordConfirm" placeholder="Confirme sua senha" rules={{ required: true }}/>

          {/* FALTA BIRTHDAY  E PROFILEPIC*/}
          <View>
            <ButtonAddImage>Profile Pic</ButtonAddImage>
          </View>
        </BoxInput>

          <ButtonTouchable backgroundColor={colors.greenStrong}>
            <Text>Register</Text>
          </ButtonTouchable>
        </PageDefault>
  );
}

export default Create;
