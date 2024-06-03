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
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Error fetching consoles");
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}