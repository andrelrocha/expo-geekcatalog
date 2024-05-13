import React, { useState } from "react";
import { Alert, Text  } from "react-native";
import { Control, useForm } from "react-hook-form";
import { View } from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

import { EarthIcon } from "../../../components/icons";
import { styles } from "../styles";
import { colors } from "../../../utils/colors";
import { loremIpsum } from "../../../utils/lorem";
import PageDefault from "../../Default";
import { useAuth } from "../../../context/hooks";
import { Box, Heading, InputEmail, InputPassword, 
  InputText, InputCPF, InputPhone, InputPasswordValidation, 
  ButtonAddImage, TextWarning,
  InputDate, PhotoSelectionModal,
  ImageTouchable, DropdownSelection,
  Button, ButtonTouchable,
  PasswordWarning,
  InputCheckbox, Modal
} from "../../../components";
import useUserCreation from "../../../context/hooks/user/useUserCreation";
import { UserCreate } from "../../../types/user/userCreateDTO";
import useCountriesDropdown from "../../../context/hooks/countries/useCountriesDropdown";
import { isSamePassword } from "../../../libs/validators/password";

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

const Create = ({ navigation }: NativeStackScreenProps<ParamListBase>) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange"})
  const { isLoading, signUp } = useAuth()

  const { uri,
    modalPicVisible, setModalPicVisible,
    isPasswordClicked, setIsPasswordClicked, 
    showTerms, setShowTerms,
    isAccepted, setIsAccepted,
    handleProfilePicture, 
  } = useUserCreation();

  const { dropdownData } = useCountriesDropdown();

  
  const handleSignUp = async (control: Control<FormData>) => {
    if (isAccepted === '') return Alert.alert('You must accept the Terms and Conditions of Use');
    
    const isEqualPassword = isSamePassword(control._formValues.password, control._formValues.passwordConfirm);
    if (!isEqualPassword) return Alert.alert('The passwords do not match');

    const name = control._formValues.name;
    const cpf = control._formValues.cpf;
    const email = control._formValues.email;
    const password = control._formValues.password;
    const country = control._formValues.country;
    const birthday = control._formValues.birthday;
    const phone = control._formValues.phone;

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

    await signUp(userData, () => navigation.navigate('AuthTabs'));    
    reset();
  }

  return (
    <>
      <PageDefault>
        <Heading mb={20} mt={10}>
          Welcome to Geek Catalog!
        </Heading>

        <Text style={styles.subtitle}>
          Fill in the fields below to create your account
        </Text>

        <Box>
          <InputText control={control} name="name" placeholder="Full Name" rules={{ required: true }} />

          <InputDate control={control} name="birthday" placeholder="Birth date" rules={{ required: true }}/>

          <InputCPF control={control} name="cpf" placeholder="CPF" rules={{ required: true }} />

          <DropdownSelection
            control={control}
            name="country"
            placeholder="Country"
            icon={<EarthIcon size={22} />}
            label="name"
            value="id"
            data={dropdownData}
          />

          <InputPhone control={control} name="phone" placeholder="Mobile Phone" rules={{ required: true }}/>

          <InputEmail control={control} name="email" placeholder="E-mail" rules={{ required: true }}/>

          <InputPasswordValidation 
            control={control} 
            name="password" 
            placeholder="Password" 
            rules={{ required: true}} 
            onTouchStart={() => setIsPasswordClicked(!isPasswordClicked)}
          />

          {isPasswordClicked && <PasswordWarning isVisible={isPasswordClicked} />}

          <InputPassword 
            control={control} 
            name="passwordConfirm" 
            placeholder="Confirm Password"
            rules={{ required: true }}
            onTouchStart={() => setIsPasswordClicked(false)}
          />

          <InputCheckbox
              aria-label="I accept the Terms and Conditions of Use"
              control={control}
              label={
                <>
                  <Text>I accept the </Text>
                  <Text
                    onPress={() => setShowTerms(true)}
                    style={{ color: colors.buttonBlue}}
                  >Terms and Conditions of Use
                  </Text>
                </>
              }
              name="term"
              onPress={() => setIsAccepted(!isAccepted ? 'accepted' : '')}
              value={isAccepted ? "accepted" : ""}
          />

          <View style={styles.containerAddImage}>
            {!uri ? (
              <>
                <ButtonAddImage children={undefined} onPress={() => setModalPicVisible(!modalPicVisible)} />
                <TextWarning ml={10} w={200} fs={12} h={42} o={0.7}>Click on the camera icon to add a profile picture</TextWarning>
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
        >Sign up
        </Button>

        <ButtonTouchable
          onPress={() => navigation.navigate('NotAuthStack', { screen: 'Login' })}
          mt={8}
          h={40}
          w={200}
          backgroundColor={colors.buttonBlue}
        >Already have an account?
        </ButtonTouchable>

      </PageDefault>

      { modalPicVisible && (
        <PhotoSelectionModal 
          visible={modalPicVisible} 
          onRequestClose={() => setModalPicVisible(false)} 
          onCameraPress={() => handleProfilePicture('camera')}
          onGalleryPress={() => handleProfilePicture('gallery')}
        />
      )}

      <Modal
        body={loremIpsum}
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms and Conditions of Use"
      />
    </> 
  );
}

export default Create;
