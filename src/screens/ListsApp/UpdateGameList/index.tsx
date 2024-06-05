import React, { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { colors } from "../../../utils/colors";
import PageDefault from "../../Default";
import { Box, Heading,
  Button, 
  InputText,
  InputWithLabel,
  DropdownSelection,
} from "../../../components";
import { useAuth } from "../../../context/hooks";
import useGameListUpdate from "../../../context/hooks/lists/useGameListUpdate";
import GameListUpdateDTO from "../../../types/gameList/GameListUpdateDTO";
import GameListReturnDTO from "../../../types/gameList/GameListReturnDTO";
import { InfoIcon } from "lucide-react-native";

const DEFAULT_FORM_VALUES = {
    console: "",
    note: "",
}

type FormData = {
    console: string,
    note: string,
}

type UpdateGameListParams = {
    gameListId: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'UpdateGameList'>;

export default function UpdateGameList({ navigation, route }: Props) {
    const { gameListId } = route.params as UpdateGameListParams;
    const { isLoading, updateGameListMethod, gameList, gameInfo } = useGameListUpdate({gameListId});
    const { currentUser } = useAuth();

    const {
        control,
        formState: { isValid },
        handleSubmit,
        reset,
        setValue,
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"
    });

    const setFields = (data: GameListReturnDTO) => {
        if (data) {
            setValue("console", data.consoleId, { shouldValidate: true });
            setValue("note", data.note, { shouldValidate: true });
        }
    }

    const handleUpdate = async (control: Control<FormData>) => {
        const console = control._formValues.console;
        const note = control._formValues.note;

        const gameListData: GameListUpdateDTO = {
            userId: currentUser?.id as string,
            consoleId: console,
            note,
        }
        
        await updateGameListMethod(gameListData, () => navigation.goBack());
    }

    useEffect(() => {
        if (gameList && gameInfo) {
            setFields(gameList as GameListReturnDTO);
        }
    }, [gameList, gameInfo]);

    return (
        <PageDefault>
            <Heading mb={20} mt={10}>
                {gameList?.gameName || 'Update Game List'}
            </Heading>
            <Box>
                {gameInfo?.consolesAvailable && gameInfo.consolesAvailable.length > 0 && (
                    <InputWithLabel label="Console Played">
                        <DropdownSelection
                            control={control}
                            name="console"
                            placeholder="Console"
                            icon={<InfoIcon/>}
                            label="name"
                            value="id"
                            data={gameInfo.consolesAvailable}
                        />
                    </InputWithLabel>
                )}

                <InputWithLabel label="Note">
                    <InputText
                        control={control}
                        name="note"
                        placeholder="Note"
                        numberOfLines={6}
                        icon={0}
                    />
                </InputWithLabel>

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
    )
}