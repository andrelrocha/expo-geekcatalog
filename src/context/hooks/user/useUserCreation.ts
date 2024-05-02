import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listAllCountries } from "../../../services/countries/listAll";
import { handleImageSelection } from "../../../services/image/getImageFromUser";

export default function useUserCreation() {

  const [uri, setUri] = useState("");
  const [dropdownData, setDropdownData] = useState<any[]>([]);
  const [modalPicVisible, setModalPicVisible] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);

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

  const handleProfilePicture = async (mode: "gallery" | "camera" | undefined) => {
    const uri = await handleImageSelection({ mode: mode });
    setUri(uri as string);
  }

  return {
    uri,
    setUri,
    dropdownData,
    setDropdownData,
    modalPicVisible,
    setModalPicVisible,
    isPasswordClicked,
    setIsPasswordClicked,
    handleProfilePicture,
  };
}
