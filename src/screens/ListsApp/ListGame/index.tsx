import React, { useEffect, useState } from "react";
import { Alert as RNAlert, StyleSheet, Text, View } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { Control, useForm, useWatch } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InfoIcon } from "lucide-react-native";
import useListGame from "../../../context/hooks/lists/useListGame";
import { Alert, Button, ButtonTouchable, DropdownSelection, Heading, InputEmail, InputText, ListImage, Modal, InputWithLabel, SwipeToggle, MultiSelect } from "../../../components";
import { SquarePenIcon, TrashIcon } from "../../../components/icons";
import { colors } from "../../../utils/colors";
import { useAuth } from "../../../context/hooks";
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
    const {isLoading, paginationInfo, grid, setGrid, loadGamesList, imageUris, hideCreateButton, setHideCreateButton, permissionModalOpen, setPermissionModalOpen, alertOption,
        gameDropwdownData, createGameList, setModalAddIsOpen, modalAddIsOpen, permissionDropdownData, addPermissionsList, deletePermissionList, setConsolesAvailableData, deleteGameListMethod,
        consolesAvailableData, isAlertVisible, setAlertVisible, selectedGameList, setSelectedGameList, userPermissions, deleteInvite, setDeleteInvite,
        modalInfoVisibible, setModalInfoVisible, gameListInfo, setGameListInfo, loadGameListInfo } = useListGame({ page: currentPageUser, listId });

    const canUpdate = userPermissions.includes("UPDATE_GAME");
    const canDelete = userPermissions.includes("DELETE_GAME");
    const canInvite = userPermissions.includes("INVITE");

    if (canUpdate) {
        alertOption.push({
            label: 'Update',
            icon: <SquarePenIcon color={colors.buttonBlue}/>,
            onPress: () => console.log('update: ', selectedGameList)
        });
    }
    if (canDelete) {
        alertOption.push({
            label: 'Delete',
            icon: <TrashIcon color={colors.redStrong}/>,
            onPress: () => handleDeletePress(selectedGameList)
        });
    }

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

    useEffect(() => {
        loadGamesList();
    }, [currentPageUser]);

    const modalAddPermission = () => {
        return (
            <View style={styles.modalContent}>
                {!deleteInvite ? (
                    <Heading fs={20} mb={10}>Add a friend to your list!</Heading>
                ) : (
                    <Heading fs={20} mb={10}>Remove a friend</Heading>
                )}
                <InputWithLabel label="Email">
                    <InputEmail control={control} name="emailParticipant" placeholder="Email"/>
                </InputWithLabel>

                {!deleteInvite && (
                    <InputWithLabel label="User Permission">
                        <MultiSelect
                            control={control}
                            name="permission"
                            placeholder="Permissions"
                            icon={<InfoIcon/>}
                            label="permission"
                            value="id"
                            data={permissionDropdownData}
                        />
                    </InputWithLabel>
                )}

                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                    <SwipeToggle isEnabled={deleteInvite} setIsEnabled={setDeleteInvite} label="Remove friend?" activeColor={colors.redStrong}/>
                </View>
                
                {!deleteInvite ? (
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
                ): (
                    <Button
                    isDisabled={!isValid}
                    isLoading={isLoading}
                    mt={15}
                    backgroundColor={colors.redStrong}
                    w={250}
                    onPress={handleSubmit(async () =>
                        handleDeletePermission(control as unknown as Control<FormData>)
                        )}
                    >Remove</Button>
                )}
                    
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

    const modalInfoGameList = () => {
        return (
            <View style={styles.modalInfoGameList}>
                <Heading fs={24} mb={10}>{gameListInfo?.gameName}</Heading>
                <Text style={styles.titleTextModalInfo}>Console Played:</Text>
                <Text style={styles.textModalInfo}>{gameListInfo?.consoleName}</Text>
                <Text style={styles.titleTextModalInfo}>Note:</Text>
                <Text style={styles.textModalInfo}>{gameListInfo?.note}</Text>
            </View>
        )
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

        await createGameList(listData);
        await loadGamesList();
        reset();
    }

    const handlePermission = async (control: Control<FormData>) => {
        const emailParticipant = control._formValues.emailParticipant;
        const permissions = control._formValues.permission;

        const permissionData = {
            ownerId: currentUser?.id as string,
            participantLogin: emailParticipant,
            listId,
            permissionsId: permissions,
        }
        
        await addPermissionsList(permissionData);
        setHideCreateButton(false);
        reset();
    }

    const handleDeletePermission = async (control: Control<FormData>) => {
        const emailParticipant = control._formValues.emailParticipant;
        await deletePermissionList(emailParticipant);
        setHideCreateButton(false);
        reset();
    }

    const handleDeletePress = (gameListId: string) => {
        RNAlert.alert(
          'Confirmation',
          'Are you sure you want to delete this item? This action cannot be undone.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            }, {
              text: 'Delete',
              style: 'destructive',
              onPress: () => deleteGameListMethod(gameListId),
            },
          ])};

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
                    ellipsis={canInvite ? true : false}
                    ellipsisLoadStates={() => {
                        setHideCreateButton(!hideCreateButton)
                        setPermissionModalOpen(!permissionModalOpen)
                    }}
                    onLongPress={canUpdate || canDelete ? (gameListId) => {
                        setAlertVisible(!isAlertVisible)
                        setSelectedGameList(gameListId)
                    } : undefined}
                    onPressLoadStates={async (gameListId) => {
                        setModalInfoVisible(true)
                        await loadGameListInfo(gameListId)
                    }}
                    //navigate={(id: string) => navigation.navigate('ListGamesList', { listId: id })}
                />
            </View>

            <Alert isVisible={isAlertVisible} setIsVisible={setAlertVisible} alertOptions={alertOption}/>

            {!hideCreateButton && userPermissions.includes("ADD_GAME") && (
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

            {modalInfoVisibible && (
                <Modal
                    body={modalInfoGameList()}
                    isOpen={modalInfoVisibible}
                    onClose={() => setModalInfoVisible(false)}
                    title={""}
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
    },
    modalInfoGameList: {
        alignItems: 'flex-start', 
        justifyContent: 'center',
        padding: 10, 
    },
    textModalInfo: {
        textAlign: 'justify', 
        width: '100%', 
        fontSize: 16,
        marginBottom: 10,
    },
    titleTextModalInfo: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});