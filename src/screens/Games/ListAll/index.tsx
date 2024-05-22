import React, { useEffect, useState } from "react";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import { List, ListImage } from "../../../components";

export default function ListAllGames() {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const {isLoading, paginationInfo, grid, setGrid, imageGames, loadImageGames } = useGamesListAll({ page: currentPageUser});
    

    useEffect(() => {
        loadImageGames();
        console.log('currentPageUser', currentPageUser);
        console.log('paginationInfo', paginationInfo);
        console.log('imageGames: ', imageGames);
    }, [currentPageUser]);
    return (
        <>

            {/*
            <ListImage
                title='All Games'
                alt="Image Game"
                totalPages={paginationInfo.totalPages}
                currentPage={currentPageUser}
                onPageChange={setCurrentPageUser}
                //onRefresh={reloadGamesList}
                modalComponent={true}   
                modalContentService={(gameId: string) => loadGameInfoData(gameId)}
                modalItemTitle="Game Info"
                imageUris={imageUris}
                isLoading={isLoading}
            />
            */}
        </>
    );
}