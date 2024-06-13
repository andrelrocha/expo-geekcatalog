import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Control, useForm } from "react-hook-form";
import { StyleSheet, View, Keyboard } from "react-native";
import { useEffect } from "react";
import { InputText, Box, Button, Heading, List } from "../../../components";
import { SearchIcon } from "../../../components/icons";
import useSearchGames from "../../../context/hooks/search/useSearchGames";
import { colors } from "../../../utils/colors";

const DEFAULT_FORM_VALUES = {
    search: '',
};

 type FormData = {
    search: string
}

export default function SearchGame({ navigation }: NativeStackScreenProps<ParamListBase>) {
    const { searchGames, isLoading, games } = useSearchGames();
    
    const {
        control,
        formState: { isValid },
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"});

    const handleSearch = async (control: Control<FormData>) => {
        const { search } = control._formValues;
        Keyboard.dismiss();
        await searchGames(search);
    }

    const searchIcon = () => {
        return <SearchIcon color={colors.buttonBlue} />
    }

    useEffect(() => {
        console.log(games)
    }, [games])

    return (
        <View style={styles.container}>
            <Box>
                    <Heading textAlign="left" fs={28} mb={10}>Search</Heading>
                    <InputText control={control} name="search" placeholder="Discover new games" icon={searchIcon} 
                        rules={{ required: true }} visibleValidation={false} staticIcon={true}/>
            </Box>

            <Button 
                    isDisabled={!isValid}
                    isLoading={isLoading}
                    mt={10}
                    onPress={() => {
                        handleSearch(control as Control<FormData>)
                    }}
                >Search
            </Button>

            {games.length > 0 && (
                <List title="Games" data={games} fields={["yearOfRelease"]} fieldsLabels={["Year of Release"]} itemTitle="name" 
                    keyExtractor={(item) => item.id} isLoading={isLoading} headerShown={false} decelerationRate="fast" itemStyle={styles.itemList}
                    navigate={(gameId: string) => navigation.navigate('ListGameById', { gameId })}/>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 10,
        marginTop: 15
    },
    itemList: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.whiteSmoke,
        backgroundColor: colors.sageOpacity,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        alignSelf: 'center',
    }
});