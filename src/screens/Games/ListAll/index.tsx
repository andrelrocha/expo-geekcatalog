import React, { useEffect, useState } from "react";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import { List } from "../../../components";

export default function ListAllGames() {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const [grid, setGrid] = useState(false);
    const {games, isLoading, paginationInfo} = useGamesListAll({ page: currentPageUser});
    const fields = ['metacritic', 'yearOfRelease'];
    const fieldsLabels = ['Metacritic', 'Year of Release'];

    return (
        <>
            <List
                data={games}
                fields={fields}
                fieldsLabels={fieldsLabels}
                keyExtractor={(item) => item.id}
                isLoading={isLoading}
                title={'Lista de Jogos'}
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