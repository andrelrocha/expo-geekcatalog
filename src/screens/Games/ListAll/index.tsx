import React, { useEffect, useState } from "react";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import { ImageTouchable, List } from "../../../components";

export default function ListAllGames() {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const {games, isLoading, loadData, loadGameInfoData, paginationInfo, 
        fields, fieldsLabels, grid, setGrid, imageUris
    } = useGamesListAll({ page: currentPageUser});

    const reloadGamesList = () => {
        setCurrentPageUser(0);
        loadData();
    };

    useEffect(() => {
        reloadGamesList();
    }, []);

    return (
        <>
        
        {imageUris.map((uri, index) => (
                <ImageTouchable key={index} alt={`IMAGE GAME TESTE ${index}`} source={{uri: uri}} />
            ))}
        {/*
            <List
                data={games}
                fields={fields}
                fieldsLabels={fieldsLabels}
                keyExtractor={(item) => item.id}
                isLoading={isLoading}
                title={'All Games'}
                itemTitle="name"
                decelerationRate="fast"
                totalPages={paginationInfo.totalPages}
                currentPage={currentPageUser}
                onPageChange={setCurrentPageUser}
                grid={grid}
                setGrid={setGrid}
                onRefresh={reloadGamesList}
                modalComponent={true}
                modalContentService={(gameId: string) => loadGameInfoData(gameId)}
                modalItemTitle="Game Info"
            />
        */}
        </>
    );
}