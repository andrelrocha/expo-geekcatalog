import { useEffect, useState } from "react"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { useAuth } from "../../../context/hooks";
import { Box, ButtonTouchable, Heading, ImageTouchable, Text } from "../../../components";
import { getProfilePic } from "../../../services/user/getProfilePic";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";

export default function UserHome({ navigation }: NativeStackScreenProps<ParamListBase>) {
    const { currentUser, logout } = useAuth();

    const [profilePicUri, setProfilePicUri] = useState('');

    const fetchProfilePic = async () => {
        try {
            const response = await getProfilePic({ userId: currentUser?.id || '' });
            if (response) {
                setProfilePicUri(response);
            }
        } catch (error) {
            console.error("Error fetching profile picture:", error);
        }   
    };

    useEffect(() => {   
        if (currentUser?.id) {
            fetchProfilePic();
        }
        
    }, [currentUser]);


   
    return (
        <PageDefault
            onRefresh={() => {fetchProfilePic();}}
        >
            <Box w={400} mt={20} alignItems="center" >
                <ImageTouchable alt='Profile Picture' source={{uri: profilePicUri}} />
                <Heading mt={20} textAlign="center" fs={26} mb={5}>Welcome, {currentUser?.name || "User"}!</Heading>
                <Text mt={0} fontSize={18} color={colors.buttonBlue}>{currentUser?.countryName}</Text>
            </Box>

            <ButtonTouchable mt={30} backgroundColor={colors.sage} textColor={colors.black} 
                onPress={() => navigation.navigate('UserInfo')}
            >Access your info</ButtonTouchable>

            <ButtonTouchable mt={10} w={200} backgroundColor={colors.redMid} textColor={colors.black} 
                onPress={logout}
            >Logout</ButtonTouchable>
          
        </PageDefault>
    )
}
