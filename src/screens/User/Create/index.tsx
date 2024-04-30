import React, { useState } from "react";
import { Text  } from "react-native";
import { Control, useForm } from "react-hook-form";
import { View } from "@gluestack-ui/themed";
import * as Animatable from "react-native-animatable";

import { EarthIcon } from "../../../components/icons";
import { styles } from "../styles";
import { colors } from "../../../utils/colors";
import PageDefault from "../../Default";
import { useAuth } from "../../../context/hooks";
import { Box, Heading, InputEmail, InputPassword, 
  InputText, InputCPF, InputPhone, InputPasswordValidation, 
  ButtonAddImage, TextWarning,
  InputDate, PhotoSelectionModal,
  ImageTouchable, DropdownSelection,
  Button
} from "../../../components";
import useUserCreation from "../../../hooks/user/useUserCreation";
import { UserCreate } from "../../../types/user/userCreateDTO";

const DEFAULT_FORM_VALUES = {
  name: "",
  birthday: "",
  cpf: "",
  phone: "",
  email: "",
  password: "",
  passwordConfirm: "",
  term: "",
  country: "",
};

type FormData = {
  name: string,
  birthday: string,
  cpf: string,
  phone: string,
  email: string,
  password: string,
  country: string,
  uri: string,
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

  const { uri, setUri,
    dropdownData, setDropdownData,
    modalPicVisible, setModalPicVisible,
    isPasswordClicked, setIsPasswordClicked, 
    handleProfilePicture
  } = useUserCreation();

  const handleSignUp = async (control: Control<FormData>) => {
    const name = control._formValues.name;
    const cpf = control._formValues.cpf;
    const email = control._formValues.email;
    const password = control._formValues.password;
    const country = control._formValues.country;
    let birthday = control._formValues.birthday;
    let phone = control._formValues.phone;

    const userData: UserCreate = {
      name,
      birthday,
      cpf,
      phone,
      login: email,
      password,
      countryId: country,
      uri: uri,
    };

    await signUp(userData);
  }

  //const [password, passwordConfirm, term] = watch("password", "passwordConfirm", "term");  
  
  const [termsVisibility, setTermsVisibility] = useState(false)
  

  return (
    <>
      <PageDefault>
        <Heading>
          Welcome to Geek Catalog!
        </Heading>

        <Text style={styles.subtitle}>
          Fill in the fields below to create your account
        </Text>

        <Box>
          <InputText control={control} name="name" placeholder="Nome Completo" rules={{ required: true }} />

          <InputDate control={control} name="birthday" placeholder="Data de Nascimento" rules={{ required: true }}/>

          <InputCPF control={control} name="cpf" placeholder="CPF" rules={{ required: true }} />

          <DropdownSelection
            control={control}
            name="country"
            placeholder="País"
            icon={<EarthIcon size={22} />}
            label="name"
            value="id"
            data={dropdownData}
          />

          <InputPhone control={control} name="phone" placeholder="Celular" rules={{ required: true }}/>

          <InputEmail control={control} name="email" placeholder="E-mail" rules={{ required: true }}/>

          <InputPasswordValidation 
            control={control} 
            name="password" 
            placeholder="Senha" 
            rules={{ required: true}} 
            onTouchStart={() => setIsPasswordClicked(!isPasswordClicked)}
          />

          {isPasswordClicked && ( 
            <Animatable.View animation={isPasswordClicked ? "fadeIn" : "fadeOut"} duration={400}>
              <TextWarning>
                Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number.
              </TextWarning>
            </Animatable.View>
          )}

          <InputPassword 
            control={control} 
            name="passwordConfirm" 
            placeholder="Confirme sua senha" 
            rules={{ required: true }}
            onTouchStart={() => setIsPasswordClicked(false)}
          />

          <View style={styles.containerAddImage}>
            {!uri ? (
              <>
                <ButtonAddImage children={undefined} onPress={() => setModalPicVisible(!modalPicVisible)} />
                <TextWarning ml={10} w={160} o={0.7}>Click on the camera icon to add a profile picture</TextWarning>
              </>
            ) : (
              <ImageTouchable onPress={() => setModalPicVisible(!modalPicVisible)} source={uri} alt='Profile Picture' />
            )}
          </View>
        </Box>

        <Button
          isDisabled={!isValid}
          isLoading={isLoading}
          mt={5}
          backgroundColor={colors.greenStrong}
          w={250}
          onPress={handleSubmit(async () =>
            handleSignUp(control as unknown as Control<FormData>)
            )}
        >Sign up //FAALTA AAJHEITAR PARA QUE LEVE PARA TELA DE USER
        </Button>

      </PageDefault>

      { modalPicVisible && (
        <PhotoSelectionModal 
          visible={modalPicVisible} 
          onRequestClose={() => setModalPicVisible(false)} 
          onCameraPress={() => handleProfilePicture('camera')}
          onGalleryPress={() => handleProfilePicture('gallery')}
        />
      )}
    </>
  );
}

export default Create;
