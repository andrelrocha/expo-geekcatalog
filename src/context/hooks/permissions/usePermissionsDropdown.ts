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
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "Failed to fetch data for permissions.";
        Alert.alert("Error", "Error fetching permissions: " + errorMessage);
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}  