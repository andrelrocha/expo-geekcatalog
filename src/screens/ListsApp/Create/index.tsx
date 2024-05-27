import React, { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { Text } from "react-native";
import { colors } from "../../../utils/colors";
import PageDefault from "../../Default";
import { Box, Heading,
  Button, 
  InputText,
  InputCheckbox,
  MultiSelect,
} from "../../../components";
import InputWithLabel from "../../../components/input/input-label";
import useListCreate from "../../../context/hooks/lists/useListCreate";
import { useAuth } from "../../../context/hooks";
import ListCreateDTO from "../../../types/listsApp/listCreateDTO";
import { InfoIcon } from "lucide-react-native";


const DEFAULT_FORM_VALUES = {
  name: "",
  description: "",
  visibility: true,
  games: [],
};

type FormData = {
  userId: string,
  name: string,
  description: string,
  visibility: boolean,
  games: string[],
}

const CreateListGame = ({ navigation }: NativeStackScreenProps<ParamListBase>) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange"});

  const { isLoading, createListMethod, gamesData } = useListCreate();
  const { currentUser } = useAuth();
  const [isPublic, setIsPublic] = useState(false);

  const handleCreate = async (control: Control<FormData>) => {
      const name = control._formValues.name;
      const description = control._formValues.description;
      const games = control._formValues.games;
      let visibility = control._formValues.visibility;

      if (isPublic) {
        visibility = true;
      } else {
        visibility = false;
      }
    
      const listData: ListCreateDTO = {
        userId: currentUser?.id as string,
        name,
        description,
        visibility,
      };

      createListMethod(listData, () => navigation.goBack(), games);
      reset();
  }

  return (
    <>
      <PageDefault>
        <Heading mb={20} mt={10}>
          Create a List
        </Heading>

        <Box>
          <InputWithLabel label="List Name">
            <InputText control={control} name="name" placeholder="Name" rules={{ required: true }} />
          </InputWithLabel>

          <InputWithLabel label="Description">
            <InputText control={control} name="description" placeholder="Description" />
          </InputWithLabel>

          <InputWithLabel label="Games">
            <MultiSelect
              control={control}
              name="games"
              placeholder="Games"
              icon={<InfoIcon/>}
              label="name"
              value="id"
              data={gamesData}
            />
          </InputWithLabel>
          
          <InputCheckbox
              aria-label="List visibility"
              control={control}
              label={
                <>
                  <Text>Public</Text>
                </>
              }
              name="visibility"
              onPress={() => setIsPublic(!isPublic ? true : false)}
              value={isPublic ? "public" : ""}
          />
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

export default CreateListGame;
