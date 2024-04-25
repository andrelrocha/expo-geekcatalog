import React, { useState } from "react";
import { Text  } from "react-native";
import { useForm } from "react-hook-form";
import { View } from "@gluestack-ui/themed";
import * as Animatable from "react-native-animatable";
import { styles } from "../styles";
import { colors } from "../../../utils/colors";
import PageDefault from "../../Default";
import { useAuth } from "../../../context/hooks";
import { BoxInput, Heading, InputEmail, InputPassword, 
  InputText, InputCPF, InputPhone, InputPasswordValidation, 
  ButtonTouchable, ButtonAddImage, TextWarning,
  InputDate, PhotoSelectionModal
} from "../../../components";


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
  //const { isLoading, signUp } = useAuth()
  const [modalPicVisible, setModalPicVisible] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const handlePasswordWarning = () => {
    setIsPasswordClicked(true);
  };

  //const [termsVisibility, setTermsVisibility] = useState(false)

  //const [password, passwordConfirm, term] = watch("password", "passwordConfirm", "term");

  
  return (
    <>
    <PageDefault>
        <Heading>
          Welcome to Geek Catalog!
        </Heading>

        <Text style={styles.subtitle}>
          Fill in the fields below to create your account
        </Text>

        <BoxInput>
          <InputText control={control} name="name" placeholder="Nome Completo" rules={{ required: true }} />

          <InputDate control={control} name="birthday" placeholder="Data de Nascimento" rules={{ required: true }}/>

          <InputCPF control={control} name="cpf" placeholder="CPF" rules={{ required: true }} />

          <InputPhone control={control} name="phone" placeholder="Celular" rules={{ required: true }}/>

          <InputEmail control={control} name="email" placeholder="E-mail" rules={{ required: true }}/>

          <InputPasswordValidation control={control} name="password" placeholder="Senha" rules={{ required: true}} onTouchStart={handlePasswordWarning}/>

          {isPasswordClicked && ( 
            <Animatable.View animation={isPasswordClicked ? "fadeIn" : "fadeOut"} duration={400}>
              <TextWarning>
                Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number.
              </TextWarning>
            </Animatable.View>
          )}

          <InputPassword control={control} name="passwordConfirm" placeholder="Confirme sua senha" rules={{ required: true }}/>

          <View style={styles.containerAddImage}>
            <ButtonAddImage children={undefined} onPress={() => setModalPicVisible(!modalPicVisible)}/>
            <TextWarning w={160} o={0.7}>Click on the camera icon to add a profile picture</TextWarning>
          </View>
        </BoxInput>

        <ButtonTouchable backgroundColor={colors.greenStrong}>
          Register
        </ButtonTouchable>

        </PageDefault>

      { modalPicVisible && (
        <PhotoSelectionModal 
          visible={modalPicVisible} 
          onRequestClose={() => setModalPicVisible(false)} 
        />
      )
      }
      </>
  );
}

export default Create;
