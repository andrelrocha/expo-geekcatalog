import { useEffect, useState } from "react";
import { handleImageSelection } from "../../../services/image/getImageFromUser";

export default function useUserCreation() {

  const [uri, setUri] = useState("");
  const [modalPicVisible, setModalPicVisible] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const [showTerms, setShowTerms] = useState(false)
  const [isAccepted, setIsAccepted] = useState('')

  const handleProfilePicture = async (mode: "gallery" | "camera" | undefined) => {
    const uri = await handleImageSelection({ mode: mode });
    setUri(uri as string);
  }

  return {
    uri,
    setUri,
    modalPicVisible,
    setModalPicVisible,
    isPasswordClicked,
    setIsPasswordClicked,
    handleProfilePicture,
    showTerms,
    setShowTerms,
    isAccepted,
    setIsAccepted
  };
}
