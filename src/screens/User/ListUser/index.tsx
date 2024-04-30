import { useEffect, useState } from "react"
import { Text } from "react-native"
import { useAuth } from "../../../context/hooks";
import { Box, Button, Heading, ImageTouchable } from "../../../components";
import { getProfilePic } from "../../../services/user/getProfilePic";
import PageDefault from "../../Default";

export default function UserInfo() {
    const { currentUser } = useAuth();
    const countryName = currentUser?.countryName;

    useEffect(() => {
        console.log('currentUser', currentUser);
        
    }, [currentUser]);

 
    return (
        <PageDefault>

            <Box w={400} mt={40} alignItems="center">
                <Heading mt={20} textAlign="center" fs={26} mb={0}>Bem vindo, {currentUser?.name}!</Heading>
                <Text>{currentUser?.countryName}</Text>
                {/*<ImageTouchable source={uri} alt='Profile Picture' /> */}
            </Box>

            <Heading fs={20} mt={10}>Informações do Usuário</Heading>
            <Box alignItems="center">
                <Text>Nome: {currentUser?.name}</Text>
                <Text>Login: {currentUser?.login}</Text>
                <Text>CPF: {currentUser?.cpf}</Text>
                <Text>País: {currentUser?.countryName}</Text>
                <Text>Telefone: {currentUser?.phone}</Text>
                <Text>Data de Nascimento: {currentUser?.birthday}</Text>
            </Box>                
            {/*
                <Text>Nome: {currentUser?.name}</Text>
                <Text>Login: {currentUser?.login}</Text>
                <Text>CPF: {currentUser?.cpf}</Text>
                <Text>País: {currentUser?.countryName}</Text>
                <Text>Telefone: {currentUser?.phone}</Text>
                <Text>Data de Nascimento: {currentUser?.birthday}</Text> */}
        </PageDefault>
    )
}