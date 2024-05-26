import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Box, TabView, TextWarning } from '../../../components';
import useListsListAllByUserID from "../../../context/hooks/lists/useListsListAllByUserID";
import ListGameCountReturn from "../../../types/listsApp/ListsAppCountReturnDTO";
import { colors } from "../../../utils/colors";
import { ScrollView } from "react-native-gesture-handler";

const renderListsView = (lists: ListGameCountReturn[]) => {
    return (
        <>
            {lists.map((item) => (
                <View key={item.id} style={styles.listItemContainer}>
                    <View style={styles.listItemTopContainer}>
                        <Text style={styles.listItemName}>{item.name}</Text>
                        <Text style={styles.listItemCount}>{item.gameCount} games</Text>
                    </View>
                    <Text style={styles.listDescription}>{item.description}</Text>
                </View>
            ))}
        </>
    );
}

export default function ListAllListsApp() {
    const [currentPage, setCurrentPage] = useState(0);
    const {lists, isLoading, paginationInfo, loadData} = useListsListAllByUserID({page: currentPage});

    useEffect(() => {
        console.log('lists on useEffect screen:', lists);
    }, [lists]);

    const MyLists = () => (
        <ScrollView>
            <Box style={styles.container}>
                {isLoading ? (
                    <TextWarning mt={20} w={300} fs={20} h={40} fw="bold">Loading...</TextWarning>
                ) : (
                    renderListsView(lists)
                )}
            </Box>
        </ScrollView>
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

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    listItemContainer: {
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 10,
        borderBottomWidth: 1, 
        borderBottomColor: colors.grayOpacity, 
    },
    listItemTopContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemCount: {
        textAlign: 'right',
        textAlignVertical: 'center',
        alignSelf: 'center',
    },
    listItemName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    listDescription: {
        marginVertical: 10
    },
});