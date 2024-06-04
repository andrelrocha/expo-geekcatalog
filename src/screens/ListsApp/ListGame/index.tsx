import React, { useEffect, useState } from "react";
import { ParamListBase } from "@react-navigation/native";
import { Control, useForm, useWatch } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InfoIcon } from "lucide-react-native";
import useListGame from "../../../context/hooks/lists/useListGame";
import { Button, ButtonTouchable, DropdownSelection, Heading, InputEmail, InputText, ListImage, Modal, MultiSelect } from "../../../components";
import { colors } from "../../../utils/colors";
import { StyleSheet, View } from "react-native";
import InputWithLabel from "../../../components/input/input-label";
import { useAuth } from "../../../context/hooks";
import useConsolesByGameIdDropdown from "../../../context/hooks/consoles/useConsolesByGameDropdown";
import { listAllConsolesByGameId } from "../../../services/consoles/listByGameId";

type ListGameParams = {
    listId: string;
    listName: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'ListGamesList'>;

const DEFAULT_FORM_VALUES = {
    game: '',
    note: '',
    console: '',
    emailParticipant: '',
    permission: '',
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
    const {isLoading, paginationInfo, grid, setGrid, loadGamesList, imageUris, hideCreateButton, setHideCreateButton, permissionModalOpen, setPermissionModalOpen,
        gameDropwdownData, createGameList, setModalAddIsOpen, modalAddIsOpen, permissionDropdownData, addPermissionList, setConsolesAvailableData, 
        consolesAvailableData } = useListGame({ page: currentPageUser, listId });

    const {
        control,
        formState: { isValid },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"});

    const selectedGameId = useWatch({
        control,
        name: "game",
    });

    useEffect(() => {
        const fetchData = async () => {
            if (selectedGameId) {
                try {
                    const data = await listAllConsolesByGameId(selectedGameId);
                    setConsolesAvailableData(data);
                } catch (error) {
                    console.error("Error fetching consoles data:", error);
                }
            }
        };
    
        fetchData();
    }, [selectedGameId]);

    const modalAddPermission = () => {
        return (
            <View style={styles.modalContent}>
                <Heading fs={20} mb={10}>Invite someone to join your list!</Heading>
                <InputWithLabel label="Email">
                    <InputEmail control={control} name="emailParticipant" placeholder="Email"/>
                </InputWithLabel>

                <InputWithLabel label="User Permission">
                    <DropdownSelection
                        control={control}
                        name="permission"
                        placeholder="Permissions"
                        icon={<InfoIcon/>}
                        label="permission"
                        value="id"
                        data={permissionDropdownData}
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
                        handlePermission(control as unknown as Control<FormData>)
                        )}
                    >Invite!</Button>
            </View>
        );
    }

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

                {selectedGameId && (
                    <InputWithLabel label="Console Played">
                        <DropdownSelection
                            control={control}
                            name="console"
                            placeholder="Console"
                            icon={<InfoIcon/>}
                            label="name"
                            value="id"
                            data={consolesAvailableData}
                        />
                    </InputWithLabel>
                )}

                <InputWithLabel label="Note">
                    <InputText control={control} name="note" numberOfLines={4}
                                placeholder="Your notes about the game" icon={0}/>
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
        const userId = currentUser?.id as string;

        const listData: FormData = {
            listId,
            userId: userId,
            gameId: gameId,
            consoleId: consoleId,
            note: note,
        };

        createGameList(listData);
        reset();
    }

    const handlePermission = async (control: Control<FormData>) => {
        const emailParticipant = control._formValues.emailParticipant;
        const permission = control._formValues.permission;

        const permissionData = {
            ownerId: currentUser?.id as string,
            participantLogin: emailParticipant,
            listId,
            permissionId: permission,
        }
        
        addPermissionList(permissionData);
        setHideCreateButton(false);
        reset();
    }

    
    useEffect(() => {
        loadGamesList();
    }, [currentPageUser]);

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <ListImage
                    title={listName}
                    alt="Image Game"
                    elementsName="games"
                    totalPages={paginationInfo.totalPages}
                    currentPage={currentPageUser}
                    onPageChange={setCurrentPageUser}
                    onRefresh={loadGamesList}
                    imageUris={imageUris}
                    isLoading={isLoading}
                    grid={grid}
                    setGrid={setGrid}
                    displayName={true}
                    ellipsis={true}
                    ellipsisLoadStates={() => {
                        setHideCreateButton(!hideCreateButton)
                        setPermissionModalOpen(!permissionModalOpen)
                    }}
                    //navigate={(id: string) => navigation.navigate('ListGamesList', { listId: id })}
                />
            </View>

            {!hideCreateButton && (
                 <View style={styles.buttonWrapper}>
                    <ButtonTouchable
                        style={styles.addButton}
                        w={350}
                        backgroundColor={colors.sage}
                        textColor={colors.black}
                        onPress={() => setModalAddIsOpen(true)}
                    >
                        Add a game
                    </ButtonTouchable>
                </View>
            )}


            {modalAddIsOpen && !isLoading && (
                <Modal
                    body={modalAddGame()}
                    isOpen={modalAddIsOpen}
                    onClose={() => setModalAddIsOpen(false)}
                    title={"Add Game to List"}
                />
            )}

            {permissionModalOpen && !isLoading && (
                <Modal
                    body={modalAddPermission()}
                    isOpen={permissionModalOpen}
                    onClose={() => setPermissionModalOpen(false)}
                    title={""}
                    h={400}
                />
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
    },
    listContainer: {
        flex: 1,
        width: '100%',
    },
    buttonWrapper: {
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.whiteSmoke,
        paddingTop: 5,
    },
    addButton: {
        alignItems: 'center',
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});