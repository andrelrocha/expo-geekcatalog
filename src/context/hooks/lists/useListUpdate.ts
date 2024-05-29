import { Alert } from "react-native";
import { useState } from "react";
import { listAppByListId } from "../../../services/listsApp/getByListId";
import { updateList } from "../../../services/listsApp/update";

export default function useListUpdate() {
    const [isLoading, setIsLoading] = useState(false);

    const loadListData = async (listId: string) => {
        setIsLoading(true);
        try {
            const listResponse = await listAppByListId({ listId });
            return listResponse;
        } catch (error: any) {
            console.error('Error fetching games:', error);
            Alert.alert('Error fetching list!', error.response?.data || 'An error occurred while fetching the list.');
        } finally {
            setIsLoading(false);
        }
    }

    const updateListMethod = async (listData: any, navigate: () => void, listId: string) => {
        setIsLoading(true);
        try {
            const updatedList = await updateList(listData, listId);
            Alert.alert('List updated successfully!');
            navigate();
            return updatedList;
        } catch (error: any) {
            console.error('Error updating list:', error);
            Alert.alert('Error updating list!', error.response?.data || 'An error occurred while updating the list.');
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, loadListData, updateListMethod };
}