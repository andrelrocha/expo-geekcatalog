import React, { useState } from "react";
import { Text  } from "react-native";
import { useForm } from "react-hook-form";
import { View } from "@gluestack-ui/themed";
import * as Animatable from "react-native-animatable";

import { EarthIcon } from "../../../components/icons";
import { styles } from "../styles";
import { colors } from "../../../utils/colors";
import PageDefault from "../../Default";
import { useAuth } from "../../../context/hooks";
import { BoxInput, Heading, InputEmail, InputPassword, 
  InputText, InputCPF, InputPhone, InputPasswordValidation, 
  ButtonTouchable, ButtonAddImage, TextWarning,
  InputDate, PhotoSelectionModal,
  ImageTouchable, DropdownSelection
} from "../../../components";
import { handleImageSelection } from "../../../services/image/getImageFromUser";
import { saveProfilePic } from "../../../services/user/saveProfilePic";
import { listAllCountries } from "../../../services/countries/listAll";
import { DropdownData } from "../../../types/utils/dropDownDTO";


import data from "../../../components/dropdown/data.js";



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
  const { isLoading, signUp, currentUser } = useAuth()
  const [modalPicVisible, setModalPicVisible] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  
  //const [password, passwordConfirm, term] = watch("password", "passwordConfirm", "term");
  
  
  const handleProfilePicture = async (mode: "gallery" | "camera" | undefined) => {
    const uri = await handleImageSelection({ mode: mode });
    setUri(uri as string);
  }

  //HANDLE USER CREATION RECEBENDO O ID DO USUÁRIO
  
  const handleUserCreateProfilePic = async () => {
    const userId = currentUser?.id;
    saveProfilePic({ uri: uri, userId: userId as string});
  }

  const handleDropdownData = () => {
    return data;
  }
  
  const [country, setCountry] = useState("");
  const [termsVisibility, setTermsVisibility] = useState(false)
  const [uri, setUri] = useState("");
  const [countries, setCountries] = useState<DropdownData[]>([]);

  const loadCountries = async () => {
    const countries = await listAllCountries();

    const dropdownData = countries.map(country => ({
      id: country.id,
      label: country.name
    }));

    //setCountries(dropdownData);
    console.log(dropdownData);

    return dropdownData;
  }
  
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

          <DropdownSelection
            control={control}
            name="country"
            placeholder="País"
            icon={<EarthIcon size={22} />}
            data={data}
            onChange={(item: unknown) => console.log(item)} // FALTA AJEITAR PARA O VALUE SETADO SEJA O COUNTRY ESCOLHIDO
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

          <InputPassword control={control} name="passwordConfirm" placeholder="Confirme sua senha" rules={{ required: true }}/>

          <View style={styles.containerAddImage}>
            {!uri ? (
              <>
                <ButtonAddImage children={undefined} onPress={() => setModalPicVisible(!modalPicVisible)} />
                <TextWarning w={160} o={0.7}>Click on the camera icon to add a profile picture</TextWarning>
              </>
            ) : (
              <ImageTouchable onPress={() => setModalPicVisible(!modalPicVisible)} source={uri} alt='Profile Picture' />
            )}
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
          onCameraPress={() => handleProfilePicture('camera')}
          onGalleryPress={() => handleProfilePicture('gallery')}
        />
      )}
    </>
  );
}

export default Create;
