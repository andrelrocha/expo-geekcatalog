import React, { useEffect, useState } from "react";
import useGamesListAllAdmin from "../../../context/hooks/games/useGamesListAllAdmin";
import { List } from "../../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

export default function ListAllGamesAdmin({ navigation }: NativeStackScreenProps<ParamListBase>) {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const {games, isLoading, loadData, paginationInfo, 
        fields, fieldsLabels, grid, setGrid
    } = useGamesListAllAdmin({ page: currentPageUser});

    const reloadGamesList = () => {
        setCurrentPageUser(0);
        loadData();
    };

    useEffect(() => {
        reloadGamesList();    
    }, []);
    
    return (
        <>
            <List
                data={games}
                fields={fields}
                fieldsLabels={fieldsLabels}
                keyExtractor={(item) => item.id}
                isLoading={isLoading}
                title={'List of Games'}
                itemTitle="name"
                decelerationRate="fast"
                totalPages={paginationInfo.totalPages}
                currentPage={currentPageUser}
                onPageChange={setCurrentPageUser}
                grid={grid}
                setGrid={setGrid}
                onRefresh={reloadGamesList}
                navigate={(gameId) => navigation.navigate('GameInfo', { gameId: gameId })}
            />
        </>
    );
}