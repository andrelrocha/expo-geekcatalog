import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PageDefault from "../../Default";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import { getProfilePic } from "../../../services/user/getProfilePic";
import { Box, ImageTouchable } from "../../../components";

type PublicProfileParams = {
    userId: string;
};

type Props = NativeStackScreenProps<ParamListBase, 'PublicProfile'>;

export default function PublicProfile({navigation, route}: Props) {
    const { userId } = route.params as PublicProfileParams;

    const [profilePicUri, setProfilePicUri] = useState('');

    const fetchProfilePic = async () => {
        try {
            const response = await getProfilePic({ userId: userId || '' });
            if (response) {
                setProfilePicUri(response);
            }
        } catch (error) {
            console.error("Error fetching profile picture:", error);
        }   
    };

    

    useEffect(() => {   
        setProfilePicUri('');
        fetchProfilePic();
    }, [userId]);

    return (
        <PageDefault
            onRefresh={() => {fetchProfilePic();}}
        >

            <Box w={400} mt={20} alignItems="center" >
                <ImageTouchable alt='Profile Picture' source={{uri: profilePicUri}} bw={5}/>
                {/*
                <Heading mt={20} textAlign="center" fs={26} mb={5}>Welcome, {currentUser?.name || "User"}!</Heading>
                <Text mt={0} fs={18} color={colors.buttonBlue}>{currentUser?.countryName}</Text>
                */}
            </Box>
            <Text>{userId}</Text>
        </PageDefault>
    );
}