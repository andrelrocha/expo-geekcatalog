import React, { useEffect, useState } from "react";
import { View } from 'react-native';
import { CustomList, TabView } from '../../../components';
import useListsListAllByUserID from "../../../context/hooks/lists/useListsListAllByUserID";

export default function ListAllListsApp() {
    const [currentPage, setCurrentPage] = useState(0);
    const {userLists, publicLists, isLoading, paginationInfo, loadDataUserLists} = useListsListAllByUserID({page: currentPage});

    useEffect(() => {
        console.log('user lists on useEffect screen:', userLists);
    }, [userLists]);

    const renderLists = (lists: any) => {
        return (
            <CustomList
                title="games"
                data={lists}
                keyExtractor={(item) => item.id.toString()}
                isLoading={isLoading}
                onRefresh={() => {console.log('falta ajeitar o refreshing para ser específico')}}
                currentPage={currentPage}
                totalPages={paginationInfo?.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        )
    }

    const MyLists = () => (
        renderLists(userLists)
    );
      
    const SharedLists = () => (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
    );
    
    const PublicLists = () => (
        renderLists(publicLists)
    );

    const scenes = {
        first: MyLists,
        second: SharedLists,
        third: PublicLists,
    };
    const [routes] = useState([
        { key: 'first', title: 'My Lists' },
        { key: 'second', title: 'Shared Lists' },
        { key: 'third', title: 'Public Lists' },
    ]);

    return (
        <TabView
                routes={routes}
                scenes={scenes}
        />
    );
}