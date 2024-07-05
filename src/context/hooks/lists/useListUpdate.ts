import { Alert } from "react-native";
import { useState } from "react";
import { listAppByListId } from "../../../services/listsApp/getByListId";
import { updateList } from "../../../services/listsApp/update";

export default function useListUpdate() {
    const [isLoading, setIsLoading] = useState(false);
    const [isPublic, setIsPublic] = useState(false);

    const loadListData = async (listId: string) => {
        setIsLoading(true);
        try {
            const listResponse = await listAppByListId({ listId });
            return listResponse;  
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to load list data.";
            Alert.alert('Error', 'An error occurred while loading the list data: ' + errorMessage);
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
            const errorMessage = error.response?.data || error.message || "Failed to update list.";
            Alert.alert('Error', 'An error occurred while updating the list: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, loadListData, updateListMethod, isPublic, setIsPublic};
}