import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PageDefault from "../../Default";
import { InputText, InputWithLabel } from "../../../components";
import { useForm } from "react-hook-form";

const DEFAULT_FORM_VALUES = {
    searchInput: '',
};

export default function SearchWikipedia({ navigation }: NativeStackScreenProps<ParamListBase>) {
    const {
        control,
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"});

    return (
        <PageDefault>
            <InputWithLabel label="Search Wikipedia" >
                <InputText control={control} name="searchInput" placeholder="Find information on Wikipedia" icon={0}/>
            </InputWithLabel>
        </PageDefault>
    )
}