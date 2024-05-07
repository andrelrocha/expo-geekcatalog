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
    

    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const response = await getProfilePic({ userId: currentUser?.id || '' });
                if (response) {
                    setProfilePicUri(response.localUri);
                    console.log("profile pic uri localUri: " + response.localUri)
                    console.log("profile pic uri: " + profilePicUri)
                }
            } catch (error) {
                console.error("Error fetching profile picture:", error);
            }
        };

        if (currentUser?.id) {
            fetchProfilePic();
        }
        
    }, [currentUser]);


   
    return (
        <PageDefault>

            <Box w={400} mt={40} alignItems="center" >
                {profilePicUri && <ImageTouchable alt='Profile Picture' source={profilePicUri} />}
                <Heading mt={20} textAlign="center" fs={26} mb={5}>Welcome, {currentUser?.name || "User"}!</Heading>
                <Text mt={0} fontSize={18} color={colors.buttonBlue}>{currentUser?.countryName}</Text>
            </Box>

            <ButtonTouchable mt={30} backgroundColor={colors.sage} textColor={colors.black} 
                onPress={() => navigation.navigate('UserInfo')}
            >Access your info</ButtonTouchable>

            <ButtonTouchable mt={10} w={200} backgroundColor={colors.redMid} textColor={colors.black} 
                onPress={logout}
            >Logout</ButtonTouchable>

            {/*
            <Box gap={5}>   
                <Heading fs={20} mt={30} mb={10}>User Information</Heading>
                <Text fontSize={18}>Name: {currentUser?.name}</Text>
                <Text fontSize={18}>Login: {currentUser?.login}</Text>
                <Text fontSize={18}>CPF: {currentUser?.cpf}</Text>
                <Text fontSize={18}>Country: {currentUser?.countryName}</Text>
                <Text fontSize={18}>Phone: {currentUser?.phone}</Text>
                <Text fontSize={18}>Date of Birth: {currentUser?.birthday}</Text>
            </Box>   
            */}            
        </PageDefault>
    )
}
