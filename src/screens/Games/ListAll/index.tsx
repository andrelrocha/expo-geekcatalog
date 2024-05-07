import React, { useEffect, useState } from "react";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import { List } from "../../../components";

export default function ListAllGames() {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const {games, isLoading, paginationInfo, 
        fields, fieldsLabels, grid, setGrid
    } = useGamesListAll({ page: currentPageUser});
    
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
            />
        </>
    );
}