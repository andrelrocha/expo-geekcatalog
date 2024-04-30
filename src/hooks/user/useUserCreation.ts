import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listAllCountries } from "../../services/countries/listAll";
import { handleImageSelection } from "../../services/image/getImageFromUser";
import { useAuth } from "../../context/hooks";
import { saveProfilePic } from "../../services/user/saveProfilePic";

export default function useUserCreation() {
  const {currentUser} = useAuth();

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
        Alert.alert("Erro", "Erro ao buscar os países");
      }
    };
    fetchData();
  }, []);

  const handleProfilePicture = async (mode: "gallery" | "camera" | undefined) => {
    const uri = await handleImageSelection({ mode: mode });
    setUri(uri as string);
  }

  const handleUserCreateProfilePic = async () => {
    const userId = currentUser?.id;
    let status = false;
    try {
      saveProfilePic({ uri: uri, userId: userId as string});
      return status = true;
    } catch (error) {
      console.error("Error saving profile pic:", error);
      Alert.alert("Erro", "Erro ao salvar a foto de perfil");
    }
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
    handleUserCreateProfilePic
  };
}
