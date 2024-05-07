import { useEffect, useState } from "react"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { useAuth } from "../../../context/hooks";
import { Box, ButtonTouchable, DropdownSelection, Heading, ImageTouchable, InputCPF, InputDate, InputEmail, InputPhone, InputText, Text } from "../../../components";
import { getProfilePic } from "../../../services/user/getProfilePic";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";
import { useForm } from "react-hook-form";
import useCountriesDropdown from "../../../context/hooks/countries/useCountriesDropdown";
import { EarthIcon } from "../../../components/icons";
import { InfoIcon } from "lucide-react-native"
import { TouchableOpacity } from "react-native";


const DEFAULT_FORM_VALUES = {
    name: "",
    birthday: "",
    phone: "",
    country: "",
};

type FormData = {
    name: string,
    birthday: string,
    phone: string,
    country: string,
}

export default function UserInfo() {
    const [editEnabled, setEditEnabled] = useState(false);
    const { currentUser, logout } = useAuth();
    const {
        control,
        formState: { isValid },
        handleSubmit,
        setValue,
    } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange"})

    const { dropdownData } = useCountriesDropdown();

    useEffect(() => {
        if (currentUser) {
            setValue("name", currentUser.name);
            setValue("birthday", currentUser.birthday);
            setValue("phone", currentUser.phone);
            setValue("country", currentUser.countryId);
        }
    }, [currentUser, setValue]);

   
    return (
        <PageDefault>
            <Heading mb={20} mt={10}>Your Info</Heading>
            <TouchableOpacity activeOpacity={1} disabled={!editEnabled}>
                <Box mt={20} alignItems="center">
                    <InputText icon={0} control={control} name="name" placeholder="Full Name" rules={{ required: true }} />

                    <InputDate icon={0} control={control} name="birthday" placeholder="Birth date" rules={{ required: true }}/>

                    <InputPhone icon={0} control={control} name="phone" placeholder="Mobile Phone" rules={{ required: true }}/>

                    <DropdownSelection
                        control={control}
                        name="country"
                        placeholder="Country"
                        label="name"
                        value="id"
                        data={dropdownData}
                    />
                </Box>
            </TouchableOpacity>

            {!editEnabled && (
                <ButtonTouchable mt={30} backgroundColor={colors.sage} textColor={colors.black} 
                    onPress={() => setEditEnabled(!editEnabled)}
                >Edit your info</ButtonTouchable>
                )
            } : {
                <ButtonTouchable mt={30} backgroundColor={colors.sage} textColor={colors.black} 
                    onPress={() => handleSubmit(() => console.log("Save your updated info"))}
                >Save your updated info</ButtonTouchable>
            }


            <ButtonTouchable mt={10} w={200} backgroundColor={colors.redMid} textColor={colors.black} 
                onPress={logout}
            >Logout</ButtonTouchable>         
        </PageDefault>
    )
}
