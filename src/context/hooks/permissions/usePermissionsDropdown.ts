import { useEffect, useState } from "react";
import { Alert } from "react-native";
import listAllGamePermissions from "../../../services/permissions/getAll";

export default function usePermissionsDropdown() {
  const [dropdownData, setDropdownData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listAllGamePermissions();
        setDropdownData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Error fetching permissions");
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}