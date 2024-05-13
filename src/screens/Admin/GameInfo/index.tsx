import { useEffect, useState } from "react"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Box, Button, ButtonTouchable, Heading,  MultiSelect, InputText } from "../../../components";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";
import { Control, useForm } from "react-hook-form";
import InputWithLabel from "../../../components/input/input-label";
import { InfoIcon } from "lucide-react-native";
import useGamesManage from "../../../context/hooks/games/useGamesManage";
import GameFullInfoAdminDTO from "../../../types/games/gameFullInfoAdminDTO";
import { NameAndIdDTO } from "../../../types/utils/nameAndIdDTO";

const DEFAULT_FORM_VALUES = {
    name: "",
    metacritic: "",
    yearOfRelease: "",
    studios: [""],
    genres: [""],
    consoles: [""],
};

type FormData = {
    name: string,
    metacritic: number,
    yearOfRelease: number,
    studios: string[],
    genres: string[], 
    consoles: string[],
}

type GameInfoParams = {
    gameId: string;
};
  
type Props = NativeStackScreenProps<ParamListBase, 'GameInfo'>;

export default function GameInfo({ navigation, route }: Props) {
    const { gameId } = route.params as GameInfoParams;

    const {
        control,
        formState: { isValid },
        handleSubmit,
        setValue,
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"})
    
    const { consolesData, genresData, studiosData, editEnabled, setEditEnabled, loadGameInfoData, setValueSelectedConsole, valueSelectedConsole,
        setValueSelectedGenre, valueSelectedGenre, setValueSelectedStudio, valueSelectedStudio } = useGamesManage();

    const setFields = (data: GameFullInfoAdminDTO) => {
        if (gameId) {
            setValue("name", data.name);
            setValue("metacritic", data.metacritic.toString());
            setValue("yearOfRelease", data.yearOfRelease.toString());

            const genreIds = data.genres.map(genre => genre.id);
            setValueSelectedGenre(genreIds);
            const studioIds = data.studios.map(studio => studio.id);
            setValueSelectedStudio(studioIds);
            const consoleIds = data.consoles.map(console => console.id);
            setValueSelectedConsole(consoleIds);
        }
    }

    const handleEdit = async (control: Control<FormData>) => {
        const name = control._formValues.name;
        const metacritic = control._formValues.metacritic;
        const yearOfRelease = control._formValues.yearOfRelease;

        const newStudios = (control._formValues.studios || []).filter((studio: string) => studio !== "");
        const newGenres = (control._formValues.genres || []).filter((genre: string) => genre !== "");
        const newConsoles = (control._formValues.consoles || []).filter((console: string) => console !== "");
        
        const studios = [...valueSelectedStudio, ...newStudios];
        const genres = [...valueSelectedGenre, ...newGenres];
        const consoles = [...valueSelectedConsole, ...newConsoles];

        const gameData: GameFullInfoAdminDTO = {
            name,
            metacritic,
            yearOfRelease,
            studios,
            genres,
            consoles,
        }
        
        console.log(gameData);
        //await update(userData);
        setEditEnabled(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            const gameData = await loadGameInfoData(gameId);
            setFields(gameData as GameFullInfoAdminDTO);
        };
        fetchData();
    }, [editEnabled]);

    const renderInputsNotEditing = () => {
        return (
            <>
                <InputWithLabel label="Name">
                    <InputText icon={0} control={control} placeholder="Name" name="name" editable={false}/>
                </InputWithLabel>
                <InputWithLabel label="Metacritic">
                    <InputText icon={0} control={control} name="metacritic" placeholder="Metacritic" editable={false}/>
                </InputWithLabel>
                <InputWithLabel label="Year of Release">
                    <InputText icon={0} control={control} name="yearOfRelease" placeholder="Year of Release" editable={false}/>
                </InputWithLabel>
                <InputWithLabel label="Consoles Available">
                    <MultiSelect
                    control={control}
                    name="consoles"
                    placeholder="Consoles"
                    icon={<InfoIcon/>}
                    label="name"
                    value="id"
                    valuesSelected={valueSelectedConsole ? valueSelectedConsole : undefined}
                    data={consolesData}
                    disabled={true}
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
                    valuesSelected={valueSelectedGenre ? valueSelectedGenre : undefined}
                    data={genresData}
                    disabled={true}
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
                    valuesSelected={valueSelectedStudio ? valueSelectedStudio : undefined}
                    data={studiosData}
                    disabled={true}
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
                    valuesSelected={valueSelectedConsole ? valueSelectedConsole : undefined}
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
                    valuesSelected={valueSelectedGenre ? valueSelectedGenre : undefined}
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
                    valuesSelected={valueSelectedStudio ? valueSelectedStudio : undefined}
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

                <ButtonTouchable w={200} mt={editEnabled ? 10 : 20} backgroundColor={colors.buttonBlue} textColor={colors.black}
                    onPress={handleSubmit(async () => {
                        handleEdit(control as unknown as Control<FormData>)
                    })}
                    disabled={!isValid}
                >Save</ButtonTouchable>

                <ButtonTouchable w={200} mt={editEnabled ? 10 : 20} backgroundColor={editEnabled ? colors.redMid : colors.sage} textColor={colors.black} 
                    onPress={() => {
                        setEditEnabled(!editEnabled)
                        //setFields(gameData as GameFullInfoAdminDTO)
                    }}
                >{editEnabled ? "Cancel" : "Edit game info"}</ButtonTouchable>       
            </PageDefault>
        </>
    )
}
