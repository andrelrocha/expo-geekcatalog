import React, { useEffect, useState } from "react";
import useListGame from "../../../context/hooks/lists/useListGame";
import { ListImage } from "../../../components";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ListGameParams = {
    listId: string;
    listName: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'ListGamesList'>;

export default function ListGamesList({ navigation, route }: Props) {
    const { listId, listName } = route.params as ListGameParams;
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const {isLoading, paginationInfo, grid, setGrid, gamesList, loadGamesList, imageUris } = useListGame({ page: currentPageUser, listId });
    
    useEffect(() => {
        loadGamesList();
    }, [currentPageUser]);

    return (
        <>
            <ListImage
                title={listName}
                alt="Image Game"
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
        </>
    );
}