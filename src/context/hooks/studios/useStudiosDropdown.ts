import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listAllStudios } from "../../../services/studios/listAll";

export default function useStudiosDropdown() {
  const [dropdownData, setDropdownData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listAllStudios();
        setDropdownData(data);
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "Failed to create studio.";
        Alert.alert('Error', 'An error occurred while creating a studio: ' + errorMessage);
      }
    };
    fetchData();
  }, []);   

    return { dropdownData, setDropdownData };
}