import { Alert } from "react-native";
import { useState } from "react";
import { listAppByListId } from "../../../services/listsApp/getByListId";
import ListGameReturn from "../../../types/listsApp/ListsAppReturnDTO";

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

    return { isLoading, loadListData };
}