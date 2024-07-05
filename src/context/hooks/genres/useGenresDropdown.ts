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
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "Failed to load genres.";
        Alert.alert('Error', 'An error occurred while loading genres: ' + errorMessage);
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}