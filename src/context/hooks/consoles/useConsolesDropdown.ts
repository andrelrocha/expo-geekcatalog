import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listAllConsoles } from "../../../services/consoles/listAll";

export default function useConsolesDropdown() {
  const [dropdownData, setDropdownData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listAllConsoles();
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