import React, { useEffect, useState } from "react";
import { View } from 'react-native';
import { TabView } from '../../../components';

const renderListsView = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
    );
}

export default function ListAllListsApp() {
    useEffect(() => {
        console.log('ListAllListsApp');

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