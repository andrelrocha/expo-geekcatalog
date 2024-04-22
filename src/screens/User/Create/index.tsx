import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import PageDefault from "../../Default";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/hooks";
import InputCPF from "../../../components/input/input-cpf";
import { BoxInput, Heading, InputText } from "../../../components";
import InputPhone from "../../../components/input/input-phone";

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

        </BoxInput>
  

        <TouchableOpacity style={[styles.smallButtonGreen, styles.buttonCadastro]}>
            <Text style={styles.smallButtonText} >Cadastre-se</Text>
          </TouchableOpacity>
      </PageDefault>
  );
}

export default Create;
