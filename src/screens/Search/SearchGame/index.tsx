import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { StyleSheet, View, Keyboard, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { InputText, Box, Heading, List, TextWarning } from "../../../components";
import { SearchIcon, CloseIcon } from "../../../components/icons";
import useSearchGames from "../../../context/hooks/search/useSearchGames";
import { colors } from "../../../utils/colors";
import useDebounce from "../../../context/hooks/debounce/useDebounce";
import { InputIcon, InputSlot } from "@gluestack-ui/themed";

const DEFAULT_FORM_VALUES = {
    search: '',
};

export default function SearchGame({ navigation }: NativeStackScreenProps<ParamListBase>) {
    
    const {
        control,
        watch,
        setValue
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"});
            
    const searchValue = watch("search");
    const [ debouncedValue ] = useDebounce(searchValue, 500);
    const [ showCloseIcon, setShowCloseIcon ] = useState(false);
    
    const { searchGames, isLoading, games } = useSearchGames();

    const handleSearch = async () => {
        await searchGames(debouncedValue);
        Keyboard.dismiss();
    }

    const handleIconClick = () => {
        if (showCloseIcon) {
            setValue("search", ""); 
            Keyboard.dismiss();
        }
    }

    const inputIcon = () => {
        if (showCloseIcon) {
            return <CloseIcon color={colors.buttonBlue} size={26}/>
        }
        return <SearchIcon color={colors.buttonBlue} />
    }

    useEffect(() => {
        setShowCloseIcon(searchValue.length > 0);
    }, [searchValue]);

    useEffect(() => {
        if (debouncedValue) {
            handleSearch();
        }
    }, [debouncedValue]);

    return (
        <View style={styles.container}>
            <Box>
                    <Heading textAlign="left" fs={28} mb={10}>Search</Heading>
                    <InputText control={control} name="search" placeholder="Discover new games" icon={0}>
                        <InputSlot onPress={handleIconClick} style={{ paddingTop: 6 }}> 
                            <InputIcon as={inputIcon}/>
                        </InputSlot>
                    </InputText>
            </Box>

            {debouncedValue ? (
                games.length > 0 ? (
                    <List
                        title="Games"
                        data={games}
                        fields={["yearOfRelease"]}
                        fieldsLabels={["Year of Release"]}
                        itemTitle="name"
                        keyExtractor={(item) => item.id}
                        isLoading={isLoading}
                        headerShown={false}
                        decelerationRate="fast"
                        itemStyle={styles.itemList}
                        navigate={(gameId: string) => navigation.navigate('ListGameById', { gameId })}
                    />
                ) : (
                    <TextWarning>
                        Game not found, please try again or contact us.
                    </TextWarning>
                )
            ) : (
                <Text style={styles.emptySearchText}>
                    Please enter a search term to discover new games.
                </Text>
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
    },
    emptySearchText: {
        marginTop: 5,
        fontSize: 16,
        color: colors.gray,
        textAlign: 'center',
    },
    inputSlot: {
        alignItems: 'center', 
    },
});