import { useEffect, useState } from "react"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { useAuth } from "../../../context/hooks";
import { Box, Button, ButtonTouchable, DropdownSelection, Heading, ImageTouchable, InputCPF, InputDate, InputEmail, InputPhone, InputText, Text } from "../../../components";
import { getProfilePic } from "../../../services/user/getProfilePic";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";
import { Control, useForm } from "react-hook-form";
import useCountriesDropdown from "../../../context/hooks/countries/useCountriesDropdown";
import { EarthIcon } from "../../../components/icons";
import { UserUpdate } from "../../../types/user/userUpdateDTO";

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
    const [editEnabled, setEditEnabled] = useState(false);
    const { currentUser, update, isLoading } = useAuth();
    const {
        control,
        formState: { isValid },
        handleSubmit,
        setValue,
    } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange"})

    const { dropdownData } = useCountriesDropdown();

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
                <InputText icon={0} control={control} name="name" placeholder="Full Name" editable={false}/>
                <InputDate icon={0} control={control} name="birthday" placeholder="Birth date" editable={false}/>
                <InputPhone icon={0} control={control} name="phone" placeholder="Mobile Phone" editable={false}/>
                <InputText icon={0} control={control} name="country" placeholder="Country" editable={false}/>
                <InputCPF icon={0} control={control} name="cpf" placeholder="CPF" editable={false}/>
                <InputEmail icon={0} control={control} name="email" placeholder="E-mail" editable={false}/>
            </>
        )
    }

    const renderInputsEditing = () => {
        return (
            <>
                <InputText control={control} name="name" placeholder="Full Name" rules={{ required: true }}  editable={true}/>
                <InputDate control={control} name="birthday" placeholder="Birth date" rules={{ required: true }}  editable={true}/>
                <InputPhone control={control} name="phone" placeholder="Mobile Phone" rules={{ required: true }}  editable={true}/>
                <DropdownSelection
                    control={control}
                    name="country"
                    placeholder="Country"
                    icon={<EarthIcon size={22} />}
                    label="name"
                    value="id"
                    data={dropdownData}
                />
            </>
        )
    }
   
    return (
         <PageDefault>
            <Heading mb={20} mt={10}>Your Info</Heading>
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
    )
}
