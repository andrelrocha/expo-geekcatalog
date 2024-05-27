import React from "react";
import { Control, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { EarthIcon } from "lucide-react-native"

import { colors } from "../../../utils/colors";
import PageDefault from "../../Default";
import { Box, Heading,
  Button, 
  InputText,
  DropdownSelection,
} from "../../../components";
import InputWithLabel from "../../../components/input/input-label";
import StudioCreate from "../../../types/studio/studioCreateDTO";
import { createStudio } from "../../../services/studios/create";
import useStudiosCreate from "../../../context/hooks/studios/useStudiosCreate";

const DEFAULT_FORM_VALUES = {
  name: "",
  country: "",
};

type FormData = {
  name: string,
  country: string,
}

const CreateStudio = ({ navigation }: NativeStackScreenProps<ParamListBase>) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange"});

  const { isLoading, countryData, createStudioContext } = useStudiosCreate();
  
  const handleCreate = async (control: Control<FormData>) => {
      const name = control._formValues.name;
      const country = control._formValues.country;
    
      const studioData: StudioCreate = {
        name,
        countryId: country,
      };

      createStudioContext(studioData, () => navigation.goBack());

      reset();
  }

  return (
    <>
      <PageDefault>
        <Heading mb={20} mt={10}>
          Create a Studio
        </Heading>

        <Box>
          <InputWithLabel label="Studio Name">
            <InputText control={control} name="name" placeholder="Name" rules={{ required: true }} />
          </InputWithLabel>

          <InputWithLabel label="Country">
            <DropdownSelection
              control={control}
              name="country"
              placeholder="Country"
              icon={<EarthIcon size={22} />}
              label="name"
              value="id"
              data={countryData}
            />       
          </InputWithLabel>  
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
    </> 
  );
}

export default CreateStudio;
