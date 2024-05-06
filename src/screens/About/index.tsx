import React from "react";
import PageDefault from "../Default";
import { Box, Heading, Text } from "../../components";
import { Image } from "react-native";

const myPhoto = require('../../assets/profile.jpg');

export default function About() {
    return (
        <PageDefault>
            <Heading mb={20}>About Me and the Project</Heading>
            <Box w={350} gap={5} alignItems="center">
                <Text>
                    This project was created to study and practice the development of mobile applications with React Native.
                </Text>
                <Text>
                    The project uses a first person API developped by me using Springboot.
                </Text>
                <Text>
                    It has an authentication flow with JWT validation for easy and secure access to the application.
                </Text>
                <Text>
                    It was also used to present as a Database project in college in "Banco de Dados" class.
                </Text>
                <Text>
                    I hope you enjoy the project and feel free to contact me for any questions.
                </Text>
            </Box>

            <Image source={myPhoto} style={{width: 200, height: 200, borderRadius: 60, marginTop: 20, marginBottom: 20}}/>
            <Text fontSize={16}>Developed by: André Rocha</Text>
            <Text>Backend/Mobile developer</Text>
        </PageDefault>
    );
}