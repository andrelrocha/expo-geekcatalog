import React, { useEffect, useState } from "react";
import useListGame from "../../../context/hooks/lists/useListGame";
import { Box, Button, ButtonTouchable, DropdownSelection, InputText, ListImage, Modal } from "../../../components";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../../../utils/colors";
import { StyleSheet, Text, View } from "react-native";
import InputWithLabel from "../../../components/input/input-label";
import { Control, useForm } from "react-hook-form";
import { InfoIcon } from "lucide-react-native";
import { useAuth } from "../../../context/hooks";
import { ModalContent } from "@gluestack-ui/themed";

type ListGameParams = {
    listId: string;
    listName: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'ListGamesList'>;

const DEFAULT_FORM_VALUES = {
    game: '',
    note: '',
    console: '',
};
  
type FormData = {
    userId: string,
    listId: string,
    consoleId: string,
    gameId: string 
    note: string,
}

export default function ListGamesList({ navigation, route }: Props) {
    const { listId, listName } = route.params as ListGameParams;
    const { currentUser } = useAuth();
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [addGame, setAddGame] = useState(false);
    const {isLoading, paginationInfo, grid, setGrid, gamesList, loadGamesList, imageUris, gameDropwdownData, consoleDropdownData } = useListGame({ page: currentPageUser, listId });

    const {
        control,
        formState: { isValid },
        handleSubmit,
        reset,
      } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"});

    const openModal = () => {
        console.log('Open Modal');
        setAddGame(true);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        //setModalData(null);
    };

    const modalAddGame = () => {
        return (
            <View style={styles.modalContent}>
                <InputWithLabel label="Game to add">
                    <DropdownSelection
                        control={control}
                        name="game"
                        placeholder="Games"
                        icon={<InfoIcon/>}
                        label="name"
                        value="id"
                        data={gameDropwdownData}
                    />
                </InputWithLabel>


                {/*FALTA AJEITAR AQUI TANTO O CAMPO TEXTO SER MAIOR, QUANTO O DROPDOWN CARREGAR DINAMICAMENTE */}

                <InputWithLabel label="Console Played">
                    <DropdownSelection
                    control={control}
                    name="console"
                    placeholder="Console"
                    icon={<InfoIcon/>}
                    label="name"
                    value="id"
                    data={consoleDropdownData}
                    />
                </InputWithLabel>

                <InputWithLabel label="Note">
                    <InputText control={control} name="note" numberOfLines={4}
                                placeholder="Your notes about the game" icon={0}
                                />
                </InputWithLabel>

                <Button
                    isDisabled={!isValid}
                    isLoading={isLoading}
                    mt={5}
                    marginBottom={40}
                    backgroundColor={colors.greenStrong}
                    w={250}
                    onPress={handleSubmit(async () =>
                        handleCreate(control as unknown as Control<FormData>)
                        )}
                    >Add</Button>
            </View>
        );
    }

    const handleCreate = async (control: Control<FormData>) => {
        const gameId = control._formValues.game;
        const note = control._formValues.note;
        const consoleId = control._formValues.console;
        const _listId = listId;
        const userId = currentUser?.id as string;

        const listData: FormData = {
            userId: userId,
            listId: _listId,
            consoleId: consoleId,
            gameId: gameId,
            note: note,
        };

        console.log('ListData', listData);
        //createListMethod(listData, () => navigation.goBack(), games);
        reset();
    }
    
    useEffect(() => {
        loadGamesList();
    }, [currentPageUser]);

    return (
        <View style={styles.container}>
            <ListImage
                title={listName}
                alt="Image Game"
                elementsName="games"
                totalPages={paginationInfo.totalPages}
                currentPage={currentPageUser}
                onPageChange={setCurrentPageUser}
                onRefresh={loadGamesList}
                modalComponent={false}   
                imageUris={imageUris}
                isLoading={isLoading}
                grid={grid}
                setGrid={setGrid}
                displayName={true}
                //modalContentService={(gameId: string) => loadGameInfoData(gameId)} --aqui vai carregar todas as infos de gameList, incluindo console, além de fazer a query para a rate e note
                //modalItemTitle="Game Info"
                //navigate={(id: string) => navigation.navigate('ListGamesList', { listId: id })}
            />
            <ButtonTouchable
                    style={[styles.addButton, gamesList.length === 0 && styles.relativeButton]}
                    w={350}
                    backgroundColor={colors.sage}
                    textColor={colors.black}
                    onPress={() => openModal()}
                    >Add a game
            </ButtonTouchable>

            {modalIsOpen && !isLoading && (
                <Modal
                    body={modalAddGame()}
                    isOpen={modalIsOpen}
                    onClose={closeModal}
                    title={"Add Game to List"}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 20,
        height: '100%',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
    },
    relativeButton: {
        position: 'relative',
        marginTop: 30,
        width: 300,
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});