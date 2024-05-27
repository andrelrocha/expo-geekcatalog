import React, { useEffect, useState } from "react";
import { CustomList, TabView } from '../../../components';
import useListsListAllByUserID from "../../../context/hooks/lists/useListsListAllByUserID";

export default function ListAllListsApp() {
    const [currentPage, setCurrentPage] = useState(0);
    const {userLists, publicLists, sharedLists, isLoading, paginationInfo, loadDataUserLists, loadDataPublicLists, loadDataSharedLists} = useListsListAllByUserID({page: currentPage});

    const renderLists = (lists: any, loadData: () => void) => {
        return (
            <CustomList
                title="games"
                data={lists}
                keyExtractor={(item) => item.id.toString()}
                isLoading={isLoading}
                onRefresh={() => loadData()}
                currentPage={currentPage}
                totalPages={paginationInfo?.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        )
    }

    const MyLists = () => (
        renderLists(userLists, loadDataUserLists)
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
        />
    );
}