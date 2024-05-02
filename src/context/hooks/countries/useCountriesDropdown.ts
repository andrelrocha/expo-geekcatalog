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
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Error fetching countries");
      }
    };
    fetchData();
  }, []);

    return { dropdownData, setDropdownData };
}