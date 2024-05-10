import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listAllGenres } from "../../../services/genres/listAll";

export default function useGenresDropdown() {
  const [dropdownData, setDropdownData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listAllGenres();
        setDropdownData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Error fetching genres");
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}