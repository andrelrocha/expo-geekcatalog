import { useEffect, useState } from "react"
import { View } from "react-native"
import { Text } from "lucide-react-native";
import { useAuth } from "../../../context/hooks";
import { Box, Button, Heading, ImageTouchable } from "../../../components";
import { getProfilePic } from "../../../services/user/getProfilePic";
import PageDefault from "../../Default";

export default function UserInfo() {
    const { currentUser } = useAuth();
    const userId = currentUser?.id;

    useEffect(() => {
        console.log(userId)
        console.log('useEffect')

        /*
        ApiManager.get('/users').then((response) => {
            console.log(response.data)
            setId(response.data.id)
            setLogin(response.data.login)
            setName(response.data.name)
        })
        */
    }, [userId]);

 
    return (
        <PageDefault>

            <Box w={400} mt={40} alignItems="center">
                <Heading mt={20} textAlign="left">Bem vindo, {currentUser?.name}!</Heading>
                <Button onPress={async () => await getProfilePic({ userId: userId || '' })}>
                    Teste
                </Button>
            </Box>


        </PageDefault>
            /*
            <ImageTouchable source={profilePicURI} alt='Profile Picture' />
            <PageDefault>
                <Heading>Informações do Usuário</Heading>
                <Text>Nome: {currentUser?.name}</Text>
                <Text>Login: {currentUser?.login}</Text>
                <Text>CPF: {currentUser?.cpf}</Text>
                <Text>País: {currentUser?.countryName}</Text>
                <Text>Telefone: {currentUser?.phone}</Text>
                <Text>Data de Nascimento: {currentUser?.birthday}</Text>
            </PageDefault>
            */
    )
}