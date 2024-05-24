import React, { useEffect, useState } from "react";
import { View } from 'react-native';
import { TabView } from '../../../components';
import useListsListAllByUserID from "../../../context/hooks/lists/useListsListAllByUserID";

const renderListsView = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
    );
}

export default function ListAllListsApp() {
    const [currentPage, setCurrentPage] = useState(0);
    const {lists, isLoading, paginationInfo, loadData} = useListsListAllByUserID({page: currentPage});

    useEffect(() => {
        console.log('ListAllListsApp');
        console.log('lists:', lists);
    }, []);

    const MyLists = () => (
        <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
    );
      
    const SharedLists = () => (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
    );
    
    const PublicLists = () => (
        <View style={{ flex: 1, backgroundColor: '#000000' }} />
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