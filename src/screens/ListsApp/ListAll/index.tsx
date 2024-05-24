import React, { useEffect, useState } from "react";
import { View } from 'react-native';
import TabView from '../../../components/tab-view';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);
  
const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#000000' }} />
);

const scenes = {
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
};

export default function ListAllListsApp() {
    const [routes] = useState([
        { key: 'first', title: 'My Lists' },
        { key: 'second', title: 'Shared Lists' },
        { key: 'third', title: 'Public Lists' },
    ]);

    useEffect(() => {
        console.log('ListAllListsApp');
    }, []);

    

    return (
        <TabView
            routes={routes}
            scenes={scenes}
        />
    );
}