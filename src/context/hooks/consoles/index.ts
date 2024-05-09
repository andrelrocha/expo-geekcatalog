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
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Error fetching consoles");
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}