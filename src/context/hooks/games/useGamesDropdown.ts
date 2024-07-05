import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listAllGamesMultiSelect } from "../../../services/games/listAllNameAndID";

export default function useGamesDropdown() {
  const [dropdownData, setDropdownData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listAllGamesMultiSelect();
        setDropdownData(data);
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "Failed to load games.";
        Alert.alert('Error', 'An error occurred while loading games: ' + errorMessage);
      }
    };
    fetchData();
  }, []);

  return { dropdownData, setDropdownData };
}