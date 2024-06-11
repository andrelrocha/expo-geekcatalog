import { useEffect } from "react"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { InfoIcon } from "lucide-react-native";
import { View } from "react-native";
import { Box, Button, ButtonTouchable, Heading,  MultiSelect, InputText, ButtonAddImage, TextWarning, ImageTouchable, ImageSelectionModal } from "../../../components";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";
import { Control, useForm } from "react-hook-form";
import InputWithLabel from "../../../components/input/input-label";
import useGamesManage from "../../../context/hooks/games/useGamesManage";
import GameFullInfoAdminDTO from "../../../types/games/gameFullInfoAdminDTO";
import { styles } from "../styles";
import UpdateGameFullInfoAdminDTO from "../../../types/games/updateGameFullInfoAdminDTO";

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
        setValueSelectedGenre, valueSelectedGenre, setValueSelectedStudio, valueSelectedStudio, update, isLoading, uri, setUri, modalPicVisible,
        setModalPicVisible, handleUserPicture, deleteGameMethod } = useGamesManage();

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

        const gameData: UpdateGameFullInfoAdminDTO = {
            id: gameId,
            name,
            metacritic,
            yearOfRelease,
            studios: newStudios,
            genres: newGenres,
            consoles: newConsoles,
        }
        
        await update(gameData, uri, navigation.goBack);
        setEditEnabled(false);
    }

    const handleDelete = async () => {
        await deleteGameMethod(gameId);
        navigation.goBack();
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
                    label="name"
                    value="id"
                    valuesSelected={valueSelectedConsole ? valueSelectedConsole : undefined}
                    data={consolesData}
                    disabled={true}
                    itemBackgroundColor={colors.sage}
                    />
                </InputWithLabel>

                <InputWithLabel label="Genres">
                    <MultiSelect
                    control={control}
                    name="genres"
                    placeholder="Genres"
                    label="name"
                    value="id"
                    valuesSelected={valueSelectedGenre ? valueSelectedGenre : undefined}
                    data={genresData}
                    disabled={true}
                    itemBackgroundColor={colors.sage}
                    />
                </InputWithLabel>

                <InputWithLabel label="Studios">
                    <MultiSelect
                    control={control}
                    name="studios"
                    placeholder="Studios"
                    label="name"
                    value="id"
                    valuesSelected={valueSelectedStudio ? valueSelectedStudio : undefined}
                    data={studiosData}
                    disabled={true}
                    itemBackgroundColor={colors.sage}
                    />
                </InputWithLabel>
            </>
        )
    }

    const renderInputsEditing = () => {
        return (
            <>
               <InputWithLabel label="Name">
                    <InputText control={control} placeholder="Name" name="name" rules={{required: true}}/>
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

                <View style={styles.containerAddImage}>
                    {!uri ? (
                    <>
                        <ButtonAddImage  children={undefined} onPress={() => setModalPicVisible(!modalPicVisible)} />
                        <TextWarning ml={10} w={200} o={0.7} fs={12} h={42}>Click on the camera icon to update the Game Image</TextWarning>
                    </>
                    ) : (
                    <ImageTouchable br={10} onPress={() => setModalPicVisible(!modalPicVisible)} source={{uri}} alt='Game Image' />
                    )}
                </View>
            </>
        )
    }
   
    return (
        <>
            <PageDefault>
                <Heading mb={10} mt={10}>Game Info</Heading>
                <Box mt={20} >
                    {editEnabled ? renderInputsEditing() : renderInputsNotEditing()}
                </Box>

                {editEnabled && (
                    <>
                    <Button isLoading={isLoading} mt={20} backgroundColor={colors.buttonBlue} textColor={colors.black}
                        onPress={handleSubmit(async () => {
                            handleEdit(control as unknown as Control<FormData>)
                            })}
                        disabled={!isValid}
                    >Save</Button>
                    
                    <Button isLoading={isLoading} mt={10} backgroundColor={colors.redMid} textColor={colors.black}
                        onPress={handleDelete}
                    >Delete</Button>
                    </>
                )}

                <ButtonTouchable w={200} mt={editEnabled ? 10 : 20} backgroundColor={colors.sage} textColor={colors.black} 
                    onPress={() => setEditEnabled(!editEnabled)}
                >{editEnabled ? "Cancel" : "Edit game info"}</ButtonTouchable>       
            </PageDefault>

            { modalPicVisible && (
                <ImageSelectionModal 
                visible={modalPicVisible} 
                onRequestClose={() => setModalPicVisible(false)} 
                onCameraPress={() => handleUserPicture('camera')}
                onGalleryPress={() => handleUserPicture('gallery')}
                />
            )}
        </>
    )
}
