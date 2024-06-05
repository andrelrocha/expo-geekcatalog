import React, { useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { colors } from "../../../utils/colors";
import PageDefault from "../../Default";
import { Box, Heading,
  Button, 
  InputText,
  SwipeToggle,
} from "../../../components";
import InputWithLabel from "../../../components/input/input-label";
import { useAuth } from "../../../context/hooks";
import ListAppDTO from "../../../types/listsApp/ListAppDTO";
import useListUpdate from "../../../context/hooks/lists/useListUpdate";
import ListGameReturn from "../../../types/listsApp/ListsAppReturnDTO";


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
    setValue,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange"});

  const { isLoading, loadListData, updateListMethod, isPublic, setIsPublic } = useListUpdate();
  const { currentUser } = useAuth();
  	

  const setFields = (data: ListGameReturn) => {
    if (listId) {
        setValue("name", data.name, { shouldValidate: true });
        setValue("description", data.description, { shouldValidate: true });
        setValue("visibility", data.visibility, { shouldValidate: true });
        setIsPublic(data.visibility);
    }
  }

  const handleUpdate = async (control: Control<FormData>) => {
      const name = control._formValues.name;
      const description = control._formValues.description;
      let visibility = control._formValues.visibility;

      if (isPublic) {
        visibility = true;
      } else {
        visibility = false;
      }
    
      const listData: ListAppDTO = {
        userId: currentUser?.id as string,
        name,
        description,
        visibility,
      };

      await updateListMethod(listData, () => navigation.goBack(), listId);
      reset();
  }

  useEffect(() => {
    const fetchData = async () => {
        const listData = await loadListData(listId);
        setFields(listData as ListGameReturn);
    }
    fetchData();
  }, [listId]);

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

          <SwipeToggle isEnabled={isPublic} setIsEnabled={setIsPublic} label="Public list?" activeColor={colors.buttonBlue}/>
        </Box>

        <Button
          isDisabled={!isValid}
          isLoading={isLoading}
          mt={5}
          marginBottom={40}
          backgroundColor={colors.greenStrong}
          w={250}
          onPress={handleSubmit(async () =>
            handleUpdate(control as unknown as Control<FormData>)
            )}
        >Save
        </Button>
      </PageDefault>
    </> 
  );
}