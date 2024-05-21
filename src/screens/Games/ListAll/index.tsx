import React, { useEffect, useState } from "react";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import { List, ListImage } from "../../../components";

export default function ListAllGames() {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const {isLoading, paginationInfo, imageUris, loadGameInfoData
    } = useGamesListAll({ page: currentPageUser});
    
    return (
        <>
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
        </>
    );
}