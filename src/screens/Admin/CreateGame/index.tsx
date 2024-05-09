import React, { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

import { colors } from "../../../utils/colors";
import PageDefault from "../../Default";
import { Box, Heading, DropdownSelection,
  Button, ButtonTouchable,
  InputText,
} from "../../../components";
import GameCreate from "../../../types/games/gameCreateDTO";
import useGamesCreate from "../../../context/hooks/games/useGamesCreate";

const DEFAULT_FORM_VALUES = {
  name: "",
  metacritic: "",
  yearOfRelease: "",
};

type FormData = {
  name: string,
  metacritic: number,
  yearOfRelease: number,
}

const Create = ({ navigation }: NativeStackScreenProps<ParamListBase>) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange"});

    const { createGameMethod, isLoading } = useGamesCreate();
  
  const handleCreate = async (control: Control<FormData>) => {
    const name = control._formValues.name;
    const metacritic = control._formValues.metacritic;
    const yearOfRelease = control._formValues.yearOfRelease;
  
    const userData: GameCreate = {
      name,
      metacritic,
      yearOfRelease,
    };

    await createGameMethod(userData);
  }

  return (
    <>
      <PageDefault>
        <Heading mb={20} mt={10}>
          Create a Game
        </Heading>

        <Box>
          <InputText control={control} name="name" placeholder="Full Name" rules={{ required: true }} />

          <InputText control={control} name="metacritic" placeholder="Metacritic" rules={{ required: true }}/>

          <InputText control={control} name="yearOfRelease" placeholder="Year of Release" rules={{ required: true }} />

          {/*
          <DropdownSelection
            control={control}
            name="country"
            placeholder="Country"
            icon={<EarthIcon size={22} />}
            label="name"
            value="id"
            data={dropdownData}
          />

          
          <View style={styles.containerAddImage}>
            {!uri ? (
              <>
                <ButtonAddImage children={undefined} onPress={() => setModalPicVisible(!modalPicVisible)} />
                <TextWarning ml={10} w={200} o={0.7}>Click on the camera icon to add a profile picture</TextWarning>
              </>
            ) : (
              <ImageTouchable onPress={() => setModalPicVisible(!modalPicVisible)} source={uri} alt='Profile Picture' />
            )}
          </View>
        */}
        </Box>

        <Button
          isDisabled={!isValid}
          isLoading={isLoading}
          mt={5}
          backgroundColor={colors.greenStrong}
          w={250}
          onPress={handleSubmit(async () =>
            handleCreate(control as unknown as Control<FormData>)
            )}
        >Create
        </Button>

      </PageDefault>

    {/*
      { modalPicVisible && (
        <PhotoSelectionModal 
          visible={modalPicVisible} 
          onRequestClose={() => setModalPicVisible(false)} 
          onCameraPress={() => handleProfilePicture('camera')}
          onGalleryPress={() => handleProfilePicture('gallery')}
        />
      )}
    */}
    </> 
  );
}

export default Create;
