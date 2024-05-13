import { useEffect, useState } from "react"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { View } from "react-native";
import { styles } from "../styles";
import { useAuth } from "../../../context/hooks";
import useUserInfo from "../../../context/hooks/user/useUserInfo";
import { Box, Button, ButtonAddImage, ButtonTouchable, DropdownSelection, Heading, ImageTouchable, InputCPF, InputDate, InputEmail, InputPhone, InputText, PhotoSelectionModal, TextWarning } from "../../../components";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";
import { Control, useForm } from "react-hook-form";
import { EarthIcon } from "../../../components/icons";
import { UserUpdate } from "../../../types/user/userUpdateDTO";
import InputWithLabel from "../../../components/input/input-label";

const DEFAULT_FORM_VALUES = {
    name: "",
    birthday: "",
    phone: "",
    country: "",
    cpf: "",
    email: "",
};

type FormData = {
    name: string,
    birthday: string,
    cpf: string,
    phone: string,
    email: string,
    password: string,
    country: string,
}

export default function UserInfo({ navigation }: NativeStackScreenProps<ParamListBase>) {
    const { currentUser, update, isLoading } = useAuth();
    const {
        control,
        formState: { isValid },
        handleSubmit,
        setValue,
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"})
    
    const { dropdownData, editEnabled, setEditEnabled, modalPicVisible, setModalPicVisible, uri, handleProfilePicture } = useUserInfo();
    

    const setFields = () => {
        if (currentUser) {
            setValue("name", currentUser.name);
            setValue("birthday", currentUser.birthday);
            setValue("phone", currentUser.phone);
            setValue("cpf", currentUser.cpf);
            setValue("email", currentUser.login);
            if (!editEnabled) setValue("country", currentUser.countryName);
            else setValue("country", currentUser.countryId);
        }
    }

    const handleEdit = async (control: Control<FormData>) => {
        const name = control._formValues.name;
        const country = control._formValues.country;
        const birthday = control._formValues.birthday;
        const phone = control._formValues.phone;

        const userData: UserUpdate = {
            name,
            countryId: country,
            birthday,
            phone,
            uri,
        }

        await update(userData);
        setEditEnabled(false);
    }

    useEffect(() => {
        if (currentUser) {
            setFields();
        }
    }, [currentUser, editEnabled]);

    const renderInputsNotEditing = () => {
        return (
            <>
                <InputWithLabel label="Full Name">
                    <InputText icon={0} control={control} name="name" editable={false}/>
                </InputWithLabel>
                <InputWithLabel label="Birth date">
                    <InputDate icon={0} control={control} name="birthday" editable={false}/>
                </InputWithLabel>
                <InputWithLabel label="Mobile Phone">
                    <InputPhone icon={0} control={control} name="phone" editable={false}/>
                </InputWithLabel>
                <InputWithLabel label="Country">
                    <InputText icon={0} control={control} name="country" editable={false}/>
                </InputWithLabel>
                <InputWithLabel label="CPF">
                    <InputCPF icon={0} control={control} name="cpf" editable={false}/>
                </InputWithLabel>
                <InputWithLabel label="E-mail">
                    <InputEmail icon={0} control={control} name="email"  editable={false}/>
                </InputWithLabel>
        </>
        )
    }

    const renderInputsEditing = () => {
        return (
            <>
                <InputWithLabel label="Full Name">
                    <InputText control={control} name="name" rules={{ required: true }} editable={true}/>
                </InputWithLabel>
                <InputWithLabel label="Birth date">
                    <InputDate control={control} name="birthday" rules={{ required: true }} editable={true}/>
                </InputWithLabel>
                <InputWithLabel label="Mobile Phone">
                    <InputPhone control={control} name="phone" rules={{ required: true }} editable={true}/>
                </InputWithLabel>
                <InputWithLabel label="Country">
                    <DropdownSelection
                        control={control}
                        name="country"
                        placeholder="Country"
                        icon={<EarthIcon size={22} />}
                        label="name"
                        value="id"
                        data={dropdownData}
                    />
                </InputWithLabel>
            
                <InputWithLabel label="Profile Pic">
                    <View style={styles.containerAddImage}>
                        {!uri ? (
                        <>
                            <ButtonAddImage children={undefined} onPress={() => setModalPicVisible(!modalPicVisible)} />
                            <TextWarning ml={10} w={200} o={0.7} fs={12} h={42}>Click on the camera icon to update your profile picture</TextWarning>
                        </>
                        ) : (
                        <ImageTouchable br={10} onPress={() => setModalPicVisible(!modalPicVisible)} source={uri} alt='Profile Picture' />
                        )}
                    </View>
                </InputWithLabel>
            </>
        )
    }
   
    return (
        <>
            <PageDefault>
                <Heading mb={10} mt={10}>Your Info</Heading>
                <Box mt={20} alignItems="center" >
                    {editEnabled ? renderInputsEditing() : renderInputsNotEditing()}
                </Box>

                {editEnabled && (
                    <Button isLoading={isLoading} mt={20} backgroundColor={colors.buttonBlue} textColor={colors.black}
                        onPress={handleSubmit(async () => {
                            handleEdit(control as unknown as Control<FormData>)
                        })}
                        disabled={!isValid}
                    >Save</Button>
                )}

                <ButtonTouchable w={200} mt={editEnabled ? 10 : 20} backgroundColor={editEnabled ? colors.redMid : colors.sage} textColor={colors.black} 
                    onPress={() => {
                        setEditEnabled(!editEnabled)
                        setFields()
                    }}
                >{editEnabled ? "Cancel" : "Edit your info"}</ButtonTouchable>       
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
    )
}
