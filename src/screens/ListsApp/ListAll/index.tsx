import React, { useState } from "react";
import { ButtonTouchable, CustomListImage, TabView } from '../../../components';
import useListsListAllWithImage from "../../../context/hooks/lists/useListsListAllWithImage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../utils/colors";

export default function ListAllListsApp({ navigation }: NativeStackScreenProps<ParamListBase>) {
    const [currentPage, setCurrentPage] = useState(0);
    const {userLists, publicLists, sharedLists, isLoading, paginationInfo, 
        loadDataUserLists, loadDataPublicLists, loadDataSharedLists, deleteList} = useListsListAllWithImage({page: currentPage});

    const renderLists = (lists: any, loadData: () => void, rightOptions: boolean = false) => {
        return (
            <CustomListImage
                title="games"
                data={lists}
                keyExtractor={(item) => item.id.toString()}
                isLoading={isLoading}
                onRefresh={() => loadData()}
                currentPage={currentPage}
                totalPages={paginationInfo?.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                onDelete={(list) => deleteList(list)}
                onUpdate={(list) => navigation.navigate('UpdateListGame', {listId: list})}
                rightOptions={rightOptions}
                navigate={(id, name) => navigation.navigate('ListGamesList', {listId: id, listName: name})}
            />
        )
    }


    const MyLists = () => (
        <>
            {renderLists(userLists, loadDataUserLists, true)}
            <View style={styles.container}>
                
                <ButtonTouchable
                    w={400}
                    backgroundColor={colors.sage}
                    textColor={colors.black}
                    onPress={() => navigation.navigate('CreateListGame')}
                    >Create a List
                </ButtonTouchable>
                </View>
        </>
    );
      
    const SharedLists = () => (
        renderLists(sharedLists, loadDataSharedLists)
    );
    
    const PublicLists = () => (
        renderLists(publicLists, loadDataPublicLists)
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
                swipeEnabled={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
});