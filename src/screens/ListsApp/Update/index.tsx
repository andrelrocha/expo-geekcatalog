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
};

type FormData = {
  userId: string,
  name: string,
  description: string,
  visibility: boolean,
};

type UpdateListGameParams = {
  listId: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'UpdateListGame'>;

export default function UpdateListGame({ navigation, route }: Props) {
  const { listId } = route.params as UpdateListGameParams;

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange"});

  //const { isLoading, createListMethod } = useListCreate();
  const { currentUser } = useAuth();
  const [isPublic, setIsPublic] = useState(false);

  const handleCreate = async (control: Control<FormData>) => {
      const name = control._formValues.name;
      const description = control._formValues.description;
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

      console.log("list data: "+ listData);
      console.log("listId: "+ listId)

      //createListMethod(listData, () => navigation.goBack(), games);
      //reset();
  }

  return (
    <>
      <PageDefault>
        <Heading mb={20} mt={10}>
          List Info
        </Heading>

        <Box>
          <InputWithLabel label="List Name">
            <InputText control={control} name="name" placeholder="Name" rules={{ required: true }} />
          </InputWithLabel>

          <InputWithLabel label="Description">
            <InputText control={control} name="description" placeholder="Description" />
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
          //isLoading={isLoading}
          mt={5}
          marginBottom={40}
          backgroundColor={colors.greenStrong}
          w={250}
          onPress={handleSubmit(async () =>
            handleCreate(control as unknown as Control<FormData>)
            )}
        >Save
        </Button>
      </PageDefault>
    </> 
  );
}