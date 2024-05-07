import React, { useState } from "react";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import { SectionList } from "../../../components";

export default function ListAllGames() {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const {games, isLoading, paginationInfo} = useGamesListAll({ page: currentPageUser});
    const fields = ['metacritic', 'yearOfRelease'];
    const fieldsLabels = ['Metacritic', 'Year of Release'];

    return (
            <SectionList
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
            />

    );
}