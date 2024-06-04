import React from "react";
import { Control, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { InfoIcon } from "lucide-react-native"

import { colors } from "../../../utils/colors";
import PageDefault from "../../Default";
import { Box, Heading,
  Button, 
  InputText,
  MultiSelect,
  ButtonAddImage,
  TextWarning,
  ImageTouchable,
  ImageSelectionModal,
} from "../../../components";
import GameCreate from "../../../types/games/gameCreateDTO";
import useGamesCreate from "../../../context/hooks/games/useGamesCreate";
import InputWithLabel from "../../../components/input/input-label";
import { isYearValid } from "../../../libs/validators/validations";
import { View } from "react-native";
import { styles } from "../styles";

const DEFAULT_FORM_VALUES = {
  name: "",
  metacritic: "",
  yearOfRelease: "",
  consoles: [],
  genres: [],
  studios: [],
  uri: "",
};

type FormData = {
  name: string,
  metacritic: number,
  yearOfRelease: number,
  consoles: string[],
  genres: string[],
  studios: string[],
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
    mode: "onChange"});

  const { createGameMethod, consolesData, genresData, 
          studiosData, isLoading, uri, setUri, 
          handleUserPicture, modalPicVisible, setModalPicVisible } = useGamesCreate();
  
  const handleCreate = async (control: Control<FormData>) => {
      const name = control._formValues.name;
      const metacritic = control._formValues.metacritic;
      const yearOfRelease = control._formValues.yearOfRelease;
      const consoles = control._formValues.consoles;
      const genres = control._formValues.genres;
      const studios = control._formValues.studios;
    
      const gameData: GameCreate = {
        name,
        metacritic,
        yearOfRelease,
        consoles,
        genres,
        studios,
        uri: uri as string,
      };

      await createGameMethod(gameData, () => navigation.goBack());
      reset();
  }

  const validateYear = (value: string) => {
    if (!value) return true;
    return isYearValid(value, "equalOrBefore") || "Please enter a valid year";
  }

  return (
    <>
      <PageDefault>
        <Heading mb={20} mt={10}>
          Create a Game
        </Heading>

        <Box>
          <InputWithLabel label="Game Name">
            <InputText control={control} name="name" placeholder="Name" rules={{ required: true }} />
          </InputWithLabel>

          <InputWithLabel label="Metacritic">
            <InputText inputProps={{ keyboardType: "numeric", maxLength: 2 }} control={control} 
                        name="metacritic" placeholder="Metacritic" rules={{ required: true }}
            />
          </InputWithLabel>

          <InputWithLabel label="Year of Release">
            <InputText inputProps={{ keyboardType: "numeric", maxLength: 4 }} control={control} name="yearOfRelease" placeholder="Year of Release"  
            rules={{ 
              required: true,
              //@ts-ignore
              validate: validateYear,
            }}
            />
          </InputWithLabel>

          <InputWithLabel label="Consoles Available">
            <MultiSelect
              control={control}
              name="consoles"
              placeholder="Consoles"
              icon={<InfoIcon/>}
              label="name"
              value="id"
              data={consolesData}
            />
          </InputWithLabel>

          <InputWithLabel label="Genres">
            <MultiSelect
              control={control}
              name="genres"
              placeholder="Genres"
              icon={<InfoIcon/>}
              label="name"
              value="id"
              data={genresData}
            />
          </InputWithLabel>

          <InputWithLabel label="Studios">
            <MultiSelect
              control={control}
              name="studios"
              placeholder="Studios"
              icon={<InfoIcon/>}
              label="name"
              value="id"
              data={studiosData}
            />
          </InputWithLabel>

          
          <View style={styles.containerAddImage}>
            {!uri ? (
              <>
                <ButtonAddImage children={undefined} onPress={() => setModalPicVisible(!modalPicVisible)} />
                <TextWarning ml={10} w={200} o={0.7} fs={12} h={42}>Click on the camera icon to add a Game Image</TextWarning>
              </>
            ) : (
              <ImageTouchable br={5} onPress={() => setModalPicVisible(!modalPicVisible)} source={{uri}} alt='Game Image' bw={1}/>
            )}
          </View>
          
        </Box>

        <Button
          isDisabled={!isValid}
          isLoading={isLoading}
          mt={5}
          marginBottom={40}
          backgroundColor={colors.greenStrong}
          w={250}
          onPress={handleSubmit(async () =>
            handleCreate(control as unknown as Control<FormData>)
            )}
        >Create
        </Button>
      </PageDefault>

      { modalPicVisible && (
        <ImageSelectionModal 
          visible={modalPicVisible} 
          onRequestClose={() => setModalPicVisible(false)} 
          onCameraPress={() => handleUserPicture('camera')}
          onGalleryPress={() => handleUserPicture('gallery')}
        />
      )}
    </> 
  );
}

export default Create;
