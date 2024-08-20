import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import PaginationInfo from "../../../types/utils/paginationInfo";
import { ButtonTouchable, CustomListImage, TabView } from '../../../components';
import useListsListAllWithImage from "../../../context/hooks/lists/useListsListAllWithImage";
import { colors } from "../../../utils/colors";
import { useAuth } from "../../../context/hooks";

type ListAllListsAppParams = {
    shouldReload?: boolean;
};

type RenderListProps = {
    lists: any;
    loadData: () => void;
    rightOptions?: boolean;
    paginationInfo: PaginationInfo;
    buttonBottom: boolean;
};

type Props = NativeStackScreenProps<ParamListBase, 'ListAllListsApp'>;

export default function ListAllListsApp({ navigation, route }: Props) {
    const { shouldReload = false } = (route.params || {}) as ListAllListsAppParams;
    const { currentUser } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);
    const {userLists, publicLists, sharedLists, isLoading, paginationPublicListInfo, paginationSharedListInfo, paginationUserListInfo, 
        loadDataUserLists, loadDataPublicLists, loadDataSharedLists, deleteList} = useListsListAllWithImage({page: currentPage});

    useEffect(() => {
        if (currentUser) {
            loadDataUserLists();
            loadDataPublicLists();
            loadDataSharedLists();
        }
    }, [currentUser]);

    useEffect(() => {
        if (shouldReload) {
            loadDataUserLists();
            loadDataPublicLists();
            navigation.setParams({ shouldReload: false });
        }
    }, [shouldReload]);

    const renderLists = ({lists, loadData, rightOptions, paginationInfo, buttonBottom}: RenderListProps) => {

        return (
            <View style={[styles.listContainer, buttonBottom && {paddingBottom: 60}]}>
                <CustomListImage
                    title="games"
                    data={lists}
                    keyExtractor={(item) => item.id.toString()}
                    isLoading={isLoading}
                    onRefresh={() => loadData()}
                    currentPage={currentPage}
                    totalPages={paginationInfo?.totalPages}
                    renderFooter={true}
                    decelerationRate="fast"
                    onPageChange={(page) => setCurrentPage(page)}
                    onDelete={(list) => deleteList(list)}
                    onUpdate={(list) => navigation.navigate('UpdateListGame', {listId: list})}
                    rightOptions={rightOptions}
                    navigate={(id, name) => navigation.navigate('ListGamesList', {listId: id, listName: name})}
                />
            </View>
        );  
    };

    const MyLists = () => {
        const props = {
            lists: userLists,
            loadData: loadDataUserLists,
            rightOptions: true,
            paginationInfo: paginationUserListInfo,
            buttonBottom: true
        }
        return (
        <>
            {renderLists(props)}
            <View style={styles.buttonWrapper}>    
                <ButtonTouchable
                    w={350}
                    backgroundColor={colors.sage}
                    textColor={colors.black}
                    onPress={() => navigation.navigate('CreateListGame')}
                    style={styles.addButton}
                >
                    Create a List
                </ButtonTouchable>
            </View>
        </>
    );}
      
    const SharedLists = () => {
        const props = {
            lists: sharedLists,
            loadData: loadDataSharedLists,
            rightOptions: false,
            paginationInfo: paginationSharedListInfo,
            buttonBottom: false
        }
        return (
        renderLists(props)
    )};
    
    const PublicLists = () => {
        const props = {
            lists: publicLists,
            loadData: loadDataPublicLists,
            rightOptions: false,
            paginationInfo: paginationPublicListInfo,
            buttonBottom: false
        }
        return (
        renderLists(props)
    )};

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
    listContainer: {
        flex: 1,
        width: '100%',
        paddingBottom: 0,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.whiteSmoke,
        paddingTop: 5,
    },
    addButton: {
        alignItems: 'center',
    },
});
