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
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Error fetching game studios");
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}