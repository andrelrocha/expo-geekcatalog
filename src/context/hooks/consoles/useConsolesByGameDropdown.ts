import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listAllConsolesByGameId } from "../../../services/consoles/listByGameId";

export default function useConsolesByGameIdDropdown(gameId: string) {
  const [dropdownData, setDropdownData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!gameId) return; 
      try {
        const data = await listAllConsolesByGameId(gameId);
        setDropdownData(data);
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "Failed to load consoles.";
        Alert.alert('Error', 'An error occurred while loading consoles: ' + errorMessage);
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}