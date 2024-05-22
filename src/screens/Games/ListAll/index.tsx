import React, { useEffect, useState } from "react";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import { List, ListImage } from "../../../components";

export default function ListAllGames() {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const {isLoading, paginationInfo, grid, setGrid, imageGames, loadImageGames, loadGameInfoData } = useGamesListAll({ page: currentPageUser});
    

    useEffect(() => {
        loadImageGames();
    }, [currentPageUser]);
    return (
        <>
            <ListImage
                title='All Games'
                alt="Image Game"
                totalPages={paginationInfo.totalPages}
                currentPage={currentPageUser}
                onPageChange={setCurrentPageUser}
                onRefresh={loadImageGames}
                modalComponent={true}   
                modalContentService={(gameId: string) => loadGameInfoData(gameId)}
                modalItemTitle="Game Info"
                imageUris={imageGames}
                isLoading={isLoading}
                grid={grid}
            />
        </>
    );
}