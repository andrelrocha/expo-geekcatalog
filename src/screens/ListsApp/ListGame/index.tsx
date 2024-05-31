import React, { useEffect, useState } from "react";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { InfoIcon } from "lucide-react-native";
import { colors } from "../../../utils/colors";
import { StyleSheet, Text, View } from "react-native";
import InputWithLabel from "../../../components/input/input-label";
import useListGame from "../../../context/hooks/lists/useListGame";
import { ButtonTouchable, DropdownSelection, ListImage, Modal, MultiSelect, TabView } from "../../../components";

type ListGameParams = {
    listId: string;
    listName: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'ListGamesList'>;

const DEFAULT_FORM_VALUES = {
    games: [],
};
  
type FormData = {
    userId: string,
    listId: string,
    games: string[],
}

export default function ListGamesList({ navigation, route }: Props) {
    const { listId, listName } = route.params as ListGameParams;
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {isLoading, paginationInfo, grid, setGrid, gamesList, loadGamesList, imageUris, gameDropwdownData } = useListGame({ page: currentPageUser, listId });

    const {
        control,
        handleSubmit,
        reset,
      } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange"});

    const openModal = () => {
        console.log('Open Modal');

        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        //setModalData(null);
    };
    
    const addBulkGames = () => {
        return (
            <InputWithLabel label="Games to add">
                <MultiSelect
                    control={control}
                    name="games"
                    placeholder="Games"
                    icon={<InfoIcon/>}
                    label="name"
                    value="id"
                    data={gameDropwdownData}
                />
            </InputWithLabel>
        );
    }

    const addGameWithInfo = () => {
        return (
            /*
            <InputWithLabel label="Game to add">
                <DropdownSelection
                    control={control}
                    name="games"
                    placeholder="Games"
                    icon={<InfoIcon/>}
                    label="name"
                    value="id"
                    data={gameDropwdownData}
                />
            </InputWithLabel>
            */
           <Text>Teste</Text>
        );
    }

    const scenes = {
        first: addBulkGames,
        second: addGameWithInfo,
    };
    
    const [routes] = useState([
        { key: 'first', title: 'Add Games' },
        { key: 'second', title: 'Game with Info' },
    ]);
    

    const modalAddGame = () => {
        return (
            <TabView
                routes={routes}
                scenes={scenes}
                swipeEnabled={true}
            />
            /*
            <View>
                <InputWithLabel label="Games to add">
                    <MultiSelect
                    control={control}
                    name="games"
                    placeholder="Games"
                    icon={<InfoIcon/>}
                    label="name"
                    value="id"
                    data={gameDropwdownData}
                    />
                </InputWithLabel>
            </View>
            */
        );
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
                    title={""}
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
});