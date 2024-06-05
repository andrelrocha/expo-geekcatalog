import React, { useEffect, useState } from "react";
import useGamesListAll from "../../../context/hooks/games/useGamesListAll";
import { ListImage } from "../../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

export default function ListAllGames({ navigation }: NativeStackScreenProps<ParamListBase>) {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const {isLoading, paginationInfo, grid, setGrid, imageGames, loadImageGames } = useGamesListAll({ page: currentPageUser});
    
    useEffect(() => {
        loadImageGames();
    }, [currentPageUser]);

    return (
        <>  
            <ListImage
                title='Games'
                alt="Image Game"
                totalPages={paginationInfo.totalPages}
                currentPage={currentPageUser}
                onPageChange={setCurrentPageUser}
                onRefresh={loadImageGames}
                navigate={(gameId: string) => navigation.navigate('ListGameById', { gameId })}
                imageUris={imageGames}
                isLoading={isLoading}
                grid={grid}
                setGrid={setGrid}
                displayName={true}
            />
        </>
    );
}