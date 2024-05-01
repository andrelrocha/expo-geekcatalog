import { useEffect } from "react"
import { useAuth } from "../../../context/hooks";
import { Box, Heading, ImageTouchable, Text } from "../../../components";
import { getProfilePic } from "../../../services/user/getProfilePic";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";

export default function UserInfo() {
    const { currentUser } = useAuth();

    useEffect(() => {
        console.log('currentUser when user listing screen loaded', currentUser);
        
    }, [currentUser]);

 
    return (
        <PageDefault>

            <Box w={400} mt={40} alignItems="center">
                <Heading mt={20} textAlign="center" fs={26} mb={5}>Welcome, {currentUser?.name}!</Heading>
                <Text mt={0} fontSize={18} color={colors.buttonBlue}>{currentUser?.countryName}</Text>
                {/*<ImageTouchable source={uri} alt='Profile Picture' /> */}
            </Box>

            <Heading fs={20} mt={30} mb={20}>User Information</Heading>
            <Box alignItems="center">
                <Text>Name: {currentUser?.name}</Text>
                <Text>Login: {currentUser?.login}</Text>
                <Text>CPF: {currentUser?.cpf}</Text>
                <Text>Country: {currentUser?.countryName}</Text>
                <Text>Phone: {currentUser?.phone}</Text>
                <Text>Date of Birth: {currentUser?.birthday}</Text>
            </Box>                
            {/*
                <Text>Name: {currentUser?.name}</Text>
                <Text>Login: {currentUser?.login}</Text>
                <Text>CPF: {currentUser?.cpf}</Text>
                <Text>Country: {currentUser?.countryName}</Text>
                <Text>Phone: {currentUser?.phone}</Text>
                <Text>Date of Birth: {currentUser?.birthday}</Text> */}
        </PageDefault>
    )
}
