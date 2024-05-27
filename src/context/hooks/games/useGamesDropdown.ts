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
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Error fetching games");
      }
    };
    fetchData();
  }, []);

  return { dropdownData, setDropdownData };
}