import React, { useEffect, useState } from "react";
import useListGame from "../../../context/hooks/lists/useListGame";
import { ButtonTouchable, ListImage, Modal } from "../../../components";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../../../utils/colors";
import { StyleSheet, View } from "react-native";

type ListGameParams = {
    listId: string;
    listName: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'ListGamesList'>;

export default function ListGamesList({ navigation, route }: Props) {
    const { listId, listName } = route.params as ListGameParams;
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {isLoading, paginationInfo, grid, setGrid, gamesList, loadGamesList, imageUris } = useListGame({ page: currentPageUser, listId });

    const openModal = () => {
        console.log('Open Modal');

        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        //setModalData(null);
    };
    
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
                    body={"Teste"}
                    isOpen={modalIsOpen}
                    onClose={closeModal}
                    title={"Add a game"}
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