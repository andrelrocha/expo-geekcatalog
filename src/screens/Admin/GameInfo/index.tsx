import { useEffect, useState } from "react"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { styles } from "../styles";
import { Box, Button, ButtonTouchable, Heading,  MultiSelect, InputText } from "../../../components";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";
import { Control, useForm } from "react-hook-form";
import InputWithLabel from "../../../components/input/input-label";
import { InfoIcon } from "lucide-react-native";
import useGamesManage from "../../../context/hooks/games/useGamesManage";
import GameFullInfo from "../../../types/games/gameFullInfoDTO";

const DEFAULT_FORM_VALUES = {
    name: "",
    metacritic: "",
    yearOfRelease: "",
    studios: [],
    genres: [],
    consoles: [],
};

type FormData = {
    name: string,
    metacritic: number,
    yearOfRelease: number,
    studios: string[],
    genres: string[],
    consoles: string[],
}

export default function GameInfo({ navigation }: NativeStackScreenProps<ParamListBase>) {
    const {
        control,
        formState: { isValid },
        handleSubmit,
        setValue,
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"})
    
    const { consolesData, genresData, studiosData, editEnabled, setEditEnabled } = useGamesManage();

    const setFields = () => {
        
    }

    const handleEdit = async (control: Control<FormData>) => {
        const name = control._formValues.name;
        const metacritic = control._formValues.metacritic;
        const yearOfRelease = control._formValues.yearOfRelease;
        const studios = control._formValues.studios;
        const genres = control._formValues.genres;
        const consoles = control._formValues.consoles;

        const gameData: GameFullInfo = {
            name,
            metacritic,
            yearOfRelease,
            studios,
            genres,
            consoles,
        }

        //await update(userData);
        setEditEnabled(false);
    }

    useEffect(() => {
     
    }, []);

    const renderInputsNotEditing = () => {
        return (
            <>
                <InputWithLabel label="Name">
                    <InputText icon={0} control={control} placeholder="Name" name="name" editable={false}/>
                </InputWithLabel>
                <InputWithLabel label="Metacritic">
                    <InputText icon={0} inputProps={{ keyboardType: "numeric", maxLength: 2 }} control={control} 
                            name="metacritic" placeholder="Metacritic" rules={{ required: true }}
                    />
                </InputWithLabel>
                <InputWithLabel label="Year of Release">
                    <InputText icon={0} inputProps={{ keyboardType: "numeric", maxLength: 4 }} control={control} 
                            name="yearOfRelease" placeholder="Year of Release" rules={{ required: true }}
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
            </>
        )
    }

    const renderInputsEditing = () => {
        return (
            <>
               <InputWithLabel label="Name">
                    <InputText control={control} placeholder="Name" name="name" editable={false}/>
                </InputWithLabel>
                <InputWithLabel label="Metacritic">
                    <InputText inputProps={{ keyboardType: "numeric", maxLength: 2 }} control={control} 
                            name="metacritic" placeholder="Metacritic" rules={{ required: true }}
                    />
                </InputWithLabel>
                <InputWithLabel label="Year of Release">
                    <InputText inputProps={{ keyboardType: "numeric", maxLength: 4 }} control={control} 
                            name="yearOfRelease" placeholder="Year of Release" rules={{ required: true }}
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
            </>
        )
    }
   
    return (
        <>
            <PageDefault>
                <Heading mb={10} mt={10}>Game Info</Heading>
                <Box mt={20} alignItems="center" >
                    {editEnabled ? renderInputsEditing() : renderInputsNotEditing()}
                </Box>

                {/*
                {editEnabled && (
                    <Button isLoading={isLoading} mt={20} backgroundColor={colors.buttonBlue} textColor={colors.black}
                        onPress={handleSubmit(async () => {
                            handleEdit(control as unknown as Control<FormData>)
                        })}
                        disabled={!isValid}
                    >Save</Button>
                )}
                */}

                <ButtonTouchable w={200} mt={editEnabled ? 10 : 20} backgroundColor={editEnabled ? colors.redMid : colors.sage} textColor={colors.black} 
                    onPress={() => {
                        setEditEnabled(!editEnabled)
                        setFields()
                    }}
                >{editEnabled ? "Cancel" : "Edit game info"}</ButtonTouchable>       
            </PageDefault>
        </>
    )
}
