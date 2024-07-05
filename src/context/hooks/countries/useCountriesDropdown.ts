import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listAllCountries } from "../../../services/countries/listAll";

export default function useCountriesDropdown() {
  const [dropdownData, setDropdownData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listAllCountries();
        setDropdownData(data);
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "Failed to load countries.";
        Alert.alert('Error', 'An error occurred while loading countries: ' + errorMessage);
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}